import prisma from '@/lib/prismaDb';
import { SearchedProduct } from '@/types/search';

export async function addViewedProduct(
  userId: string,
  SearchedProduct: SearchedProduct,
  fromSearch: boolean,
  query: string = '',
) {
  if (!userId || !SearchedProduct) return null;
  return prisma.viewedProduct.upsert({
    where: {
      userId_slug: {
        userId: userId,
        slug: SearchedProduct.slug,
      },
    },
    update: {
      viewedAt: new Date(),
      product: SearchedProduct,
    },
    create: {
      userId,
      slug: SearchedProduct.slug,
      product: SearchedProduct,
      fromSearch,
      query,
      viewedAt: new Date(),
    },
  });
}

export async function getRecentViewedProducts(
  userId: string,
  fromSearch?: boolean,
) {
  if (!userId) return [];
  const where: {
    userId: string;
    fromSearch?: boolean;
  } = { userId };
  if (typeof fromSearch === 'boolean') {
    where.fromSearch = fromSearch;
  }
  const viewed = await prisma.viewedProduct.findMany({
    where,
    orderBy: { viewedAt: 'desc' },
    take: 8,
  });
  return viewed.map((v) => v.product);
}
