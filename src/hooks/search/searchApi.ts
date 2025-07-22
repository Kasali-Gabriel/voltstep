import type {
  PopularSearchItem,
  SearchedProduct,
  SearchHistoryItem,
} from '@/types/search';
import { ProductFilters } from '@/utils/productFilters';
import axios from 'axios';

export async function fetchPopularSearchesApi(): Promise<PopularSearchItem[]> {
  try {
    const res = await axios.get('/api/search/popular');
    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
}

export async function fetchRecentSearchesAndViewedApi(
  userId: string | undefined,
  guestSearchHistory: SearchHistoryItem[],
  guestViewedProducts: { product: SearchedProduct }[],
): Promise<{
  recentSearches: SearchHistoryItem[];
  recentViewed: SearchedProduct[];
}> {
  if (!userId) {
    return {
      recentSearches: guestSearchHistory,
      recentViewed: guestViewedProducts.map((item) => item.product),
    };
  }
  try {
    const [searchRes, viewedRes] = await Promise.all([
      axios.get('/api/search/history', { params: { userId } }),
      axios.get('/api/search/viewedproduct', { params: { userId } }),
    ]);
    return {
      recentSearches: searchRes.data.recentSearches || [],
      recentViewed: viewedRes.data || [],
    };
  } catch {
    return { recentSearches: [], recentViewed: [] };
  }
}

export function buildSearchParams(
  query: string,
  limit: number,
  offset: number,
  sort: string | undefined,
  filters: ProductFilters = {},
): Record<string, unknown> {
  const params: Record<string, unknown> = {
    q: query,
    limit,
    offset,
    sort,
  };
  if (filters) {
    if (filters.priceRange) {
      params.minPrice = filters.priceRange[0];
      params.maxPrice = filters.priceRange[1];
    }
    if (filters.priceRanges && filters.priceRanges.length > 0) {
      params.priceRanges = filters.priceRanges
        .map(([min, max]) => `${min}-${max}`)
        .join(',');
    }
    if (filters.sizes && filters.sizes.length > 0) {
      params.sizes = filters.sizes.join(',');
    }
    if (filters.colors && filters.colors.length > 0) {
      params.colors = filters.colors.join(',');
    }
    if (filters.tags && filters.tags.length > 0) {
      params.tags = filters.tags.join(',');
    }
    if (filters.rating && filters.rating > 0) {
      params.rating = filters.rating;
    }
    if (filters.inStock) {
      params.inStock = 'true';
    }
  }
  return params;
}

export async function searchProductsApi(
  params: Record<string, unknown>,
  signal?: AbortSignal,
) {
  const res = await axios.get('/api/search', { params, signal });
  return res.data;
}

export async function saveSearchHistoryApi(userId: string, query: string) {
  await Promise.all([
    axios.post('/api/search/history', { userId, query }),
    axios.post('/api/search/popular', { query }),
  ]);
}

export async function saveGuestSearchHistory(
  addGuestSearchHistory: (item: {
    id: string;
    query: string;
    searchedAt: string;
  }) => void,
  query: string,
) {
  addGuestSearchHistory({
    id: Date.now().toString(),
    query,
    searchedAt: new Date().toISOString(),
  });
}
