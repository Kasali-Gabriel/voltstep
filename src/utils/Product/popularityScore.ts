import prisma from '@/lib/prismaDb';

export interface PopularityScoreData {
  reviewCount: number;
  averageRating: number;
  orderQuantity: number;
  wishlistCount: number;
  viewCount: number;
  productAge: number; // days since created
}

// Weights for popularity calculation
const WEIGHTS = {
  reviewCount: 0.25,
  qualityScore: 0.2, // averageRating * reviewCount
  orderQuantity: 0.3,
  wishlistCount: 0.15,
  viewCount: 0.05,
  recencyBoost: 0.05,
};

/**
 * Calculate popularity score for a product
 */
function calculatePopularityScore(data: PopularityScoreData): number {
  const {
    reviewCount,
    averageRating,
    orderQuantity,
    wishlistCount,
    viewCount,
    productAge,
  } = data;

  // Quality score: average rating weighted by review count
  const qualityScore = averageRating * reviewCount;

  // Recency boost: newer products get a small boost (decays over 90 days)
  const recencyBoost = Math.max(0, (90 - productAge) / 90) * 10;

  // Calculate weighted popularity score
  const popularityScore =
    reviewCount * WEIGHTS.reviewCount +
    qualityScore * WEIGHTS.qualityScore +
    orderQuantity * WEIGHTS.orderQuantity +
    wishlistCount * WEIGHTS.wishlistCount +
    viewCount * WEIGHTS.viewCount +
    recencyBoost * WEIGHTS.recencyBoost;

  return Math.round(popularityScore * 100) / 100; // Round to 2 decimal places
}

/**
 * Get popularity data for a specific product
 */
async function getProductPopularityData(
  productId: string,
): Promise<PopularityScoreData> {
  // Get review stats
  const reviewStats = await prisma.review.aggregate({
    where: { productId },
    _count: { id: true },
    _avg: { rating: true },
  });

  // Get order quantity
  const orderStats = await prisma.orderItem.aggregate({
    where: { productId },
    _sum: { quantity: true },
  });

  // Get wishlist count
  const wishlistCount = await prisma.wishList.count({
    where: { productId },
  });

  // Get view count
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { slug: true, createdAt: true },
  });

  const viewCount = product
    ? await prisma.viewedProduct.count({
        where: { slug: product.slug },
      })
    : 0;

  // Calculate product age in days
  const productAge = product
    ? Math.floor(
        (Date.now() - product.createdAt.getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0;

  return {
    reviewCount: reviewStats._count.id || 0,
    averageRating: reviewStats._avg.rating || 0,
    orderQuantity: orderStats._sum.quantity || 0,
    wishlistCount,
    viewCount,
    productAge,
  };
}

/**
 * Update popularity score for a specific product
 */
export async function updateProductPopularityScore(
  productId: string,
): Promise<number> {
  const popularityData = await getProductPopularityData(productId);
  const score = calculatePopularityScore(popularityData);

  await prisma.product.update({
    where: { id: productId },
    data: {
      popularityScore: score,
      lastScoreUpdate: new Date(),
    },
  });

  return score;
}

/**
 * Update popularity scores for all products
 */
export async function updateAllProductPopularityScores(): Promise<void> {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  // Process in batches to avoid overwhelming the database
  const batchSize = 10;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const updatePromises = batch.map((product) =>
      updateProductPopularityScore(product.id),
    );
    await Promise.all(updatePromises);
  }
}
