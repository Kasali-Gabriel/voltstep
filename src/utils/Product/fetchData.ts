import { fetchData } from '@/lib/fetch';
import { Product } from '@/types/product';
import { SearchedProduct } from '@/types/search';

export interface InitialProductsResult {
  initialProducts: Product[] | SearchedProduct[];
  initialTotalCount: number;
  initialHasMore: boolean;
}

interface ProductsApiResponse {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
}

interface SearchApiResponse {
  hits: SearchedProduct[];
  hasMore: boolean;
  totalCount: number;
}

// Fetch initial products or search results for SSR / SSG
export const fetchInitialProducts = async ({
  query = '',
  slug = [],
}: {
  query?: string;
  slug?: string[];
}): Promise<InitialProductsResult> => {
  let initialProducts: Product[] | SearchedProduct[] = [];
  let initialTotalCount = 0;
  let initialHasMore = false;

  if (query) {
    // Server-side fetch initial search results
    const params = new URLSearchParams({
      q: query,
      limit: '18',
      offset: '0',
    });
    const searchRes = await fetchData<SearchApiResponse>(
      `/api/search?${params.toString()}`,
      { noStore: true },
    );
    if (searchRes) {
      initialProducts = searchRes.hits || [];
      initialTotalCount = searchRes.totalCount || 0;
      initialHasMore = searchRes.hasMore || false;
    }
  } else {
    // Always use /api/products and pass slugs as query params
    const params = new URLSearchParams({
      limit: '18',
      offset: '0',
      unfiltered: 'true',
    });
    if (slug.length > 0) {
      params.set('catalog', slug[0]);
    }
    if (slug.length > 1) {
      params.set('category', slug[1]);
    }
    if (slug.length > 2) {
      params.set('subcategory', slug[2]);
    }

    const prodRes = await fetchData<ProductsApiResponse>(
      `/api/products?${params.toString()}`,
      { noStore: true },
    );

    if (prodRes) {
      initialProducts = prodRes.products || [];
      initialTotalCount = prodRes.totalCount || 0;
      initialHasMore = prodRes.hasMore || false;
    }
  }

  return {
    initialProducts,
    initialTotalCount,
    initialHasMore,
  };
};
