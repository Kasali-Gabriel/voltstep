import type {
  PopularSearchItem,
  SearchedProduct,
  SearchHistoryItem,
} from '@/types/search';
import axios from 'axios';

export async function searchProducts(
  params: Record<string, unknown>,
  signal?: AbortSignal,
) {
  const res = await axios.get('/api/search', { params, signal });
  return res.data;
}

export async function fetchPopularSearches(): Promise<PopularSearchItem[]> {
  try {
    const res = await axios.get('/api/search/popular');
    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
}


export async function fetchRecentSearches(
  userId: string | undefined,
  guestSearchHistory: SearchHistoryItem[],
): Promise<SearchHistoryItem[]> {
  if (!userId) {
    return guestSearchHistory;
  }
  try {
    const res = await axios.get('/api/search/history', { params: { userId } });
    return res.data.recentSearches || [];
  } catch {
    return [];
  }
}

export async function fetchRecentViewed(
  userId: string | undefined,
  guestViewedProducts: { product: SearchedProduct }[],
): Promise<SearchedProduct[]> {
  if (!userId) {
    return guestViewedProducts.map((item) => item.product);
  }
  try {
    const res = await axios.get('/api/search/viewedproduct', {
      params: { userId },
    });
    return res.data || [];
  } catch {
    return [];
  }
}

export async function saveSearchHistory(userId: string, query: string) {
  await axios.post('/api/search/history', { userId, query });
}

export async function savePopularSearch(query: string) {
  await axios.post('/api/search/popular', { query });
}

