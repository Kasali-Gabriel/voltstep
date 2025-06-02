import prisma from '@/lib/prismaDb';
import { WishListItem } from '@/types/auth';

// Add a product to the user's wishlist
export async function addToWishlist(userId: string, item: WishListItem) {
  if (!userId) throw new Error('Not authenticated');
  if (!item.productId) throw new Error('No product specified');

  // Prevent duplicate wishlist entries
  const existing = await prisma.wishList.findFirst({
    where: { userId, productId: item.productId },
  });

  if (existing) return existing;

  const wishListEntry = await prisma.wishList.create({
    data: {
      userId,
      productId: item.productId,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
    },
    include: { product: true },
  });
  return wishListEntry;
}

// Get all wishlist items for a user, optionally filter by productId
export async function getWishlist(userId: string, productId?: string) {
  if (!userId) throw new Error('Not authenticated');

  const where: { userId: string; productId?: string } = { userId };

  if (productId) where.productId = productId;

  return prisma.wishList.findMany({
    where,
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
}

// Remove a product from the user's wishlist
export async function removeFromWishlist(userId: string, productId: string) {
  if (!userId || !productId) throw new Error('Missing user or product');
  await prisma.wishList.deleteMany({
    where: { userId, productId },
  });
  return true;
}
