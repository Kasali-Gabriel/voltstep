import { meiliClient } from '@/lib/meiliClient';
import prisma from '@/lib/prismaDb';
import { SearchedProduct } from '@/types/search';
import { Filter } from 'bad-words';

export async function getPopularSearches(limit = 8) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return prisma.popularSearch.findMany({
    where: { lastSearched: { gte: sevenDaysAgo } },
    orderBy: [{ count: 'desc' }, { lastSearched: 'desc' }],
    take: limit,
  });
}

export async function updatePopularSearch(query: string) {
  const filter = new Filter();

  const cleaned = query.trim().toLowerCase().replace(/\s+/g, ' ');

  const isValid =
    cleaned.length >= 3 &&
    cleaned.length <= 50 &&
    /[a-zA-Z]/.test(cleaned) &&
    !/^[^a-zA-Z0-9]+$/.test(cleaned);

  if (!isValid) return null;

  if (filter.isProfane(cleaned)) return null;

  const search = await meiliClient
    .index('products')
    .search(cleaned, { limit: 1 });
  if (search.hits.length === 0) return null;

  return prisma.popularSearch.upsert({
    where: { query: cleaned },
    update: {
      count: { increment: 1 },
      lastSearched: new Date(),
    },
    create: {
      query: cleaned,
      count: 1,
      lastSearched: new Date(),
    },
  });
}

export async function addSearchHistory(userId: string, query: string) {
  if (!userId || !query) return null;

  const cleaned = query.trim().toLowerCase().replace(/\s+/g, ' ');

  const isValid =
    cleaned.length >= 3 &&
    cleaned.length <= 50 &&
    /[a-zA-Z]/.test(cleaned) &&
    !/^[^a-zA-Z0-9]+$/.test(cleaned);

  if (!isValid) return null;

  return prisma.searchHistory.upsert({
    where: {
      userId_query: {
        userId,
        query: cleaned,
      },
    },
    update: {
      searchedAt: new Date(),
    },
    create: {
      userId,
      query: query.trim().toLowerCase(),
    },
  });
}

export async function getRecentSearchHistory(userId: string, limit = 10) {
  if (!userId) return [];
  return prisma.searchHistory.findMany({
    where: { userId },
    orderBy: { searchedAt: 'desc' },
    take: limit,
  });
}

export async function addViewedProduct(
  userId: string,
  SearchedProduct: SearchedProduct,
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
    },
  });
}

export async function getRecentViewedProducts(userId: string, limit = 10) {
  if (!userId) return [];
  const viewed = await prisma.viewedProduct.findMany({
    where: { userId },
    orderBy: { viewedAt: 'desc' },
    take: limit,
  });
  return viewed.map((v) => v.product);
}
