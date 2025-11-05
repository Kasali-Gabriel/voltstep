import prisma from '@/lib/prismaDb';

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        subcategory: {
          include: {
            category: {
              include: {
                catalog: true,
              },
            },
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        colors: {
          include: {
            variants: true,
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    // Calculate average rating
    const totalRating = product.reviews.reduce(
      (sum: number, review) => sum + review.rating,
      0,
    );
    const avgRating =
      product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

    // Get wishlist count
    const wishlistCount = await prisma.wishList.count({
      where: { productId: product.id },
    });

    // Get view count
    const viewCount = await prisma.viewedProduct.count({
      where: { slug: product.slug },
    });

    // Generate popularity history for the last 30 days
    const popularityHistory = Array.from({ length: 30 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - index));

      // Simulate trend based on current popularity with some variance
      const baseTrend = product.popularityScore;
      const variance = Math.sin(index * 0.3) * 15 + Math.random() * 10 - 5;
      const score = Math.max(0, Math.min(100, baseTrend + variance));

      return {
        date: date.toISOString(),
        score: Math.round(score),
      };
    });

    return {
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      stats: {
        wishlistCount,
        viewCount,
        popularityHistory,
      },
    };
  } catch (error) {
    console.error('Error fetching product with full details:', error);
    throw new Error('Failed to fetch product details');
  }
}
