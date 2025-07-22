import { useCallback, useEffect, useRef, useState } from 'react';
import {
  buildSearchParams,
  fetchPopularSearchesApi,
  fetchRecentSearchesAndViewedApi,
  searchProductsApi,
} from './searchApi';

import { useUser } from '@/context/UserContext';
import { useSearchHistoryStore, useViewedProductStore } from '@/lib/state';
import {
  PopularSearchItem,
  SearchedProduct,
  SearchHistoryItem,
} from '@/types/search';
import { ProductFilters } from '@/utils/productFilters';
import { usePagination } from '../usePagination';
import {
  addGuestSearchHistory as addGuestSearchHistoryHelper,
  addGuestViewedProduct as addGuestViewedProductHelper,
} from './guestHistory';

export function useSearch({
  query,
  sort,
  filters = {},
}: {
  query: string;
  sort?: string;
  filters?: ProductFilters;
}) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const saveDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef<string>(''); // Prevent re-searching same query
  const lastSortRef = useRef<string | undefined>(undefined);
  const lastFiltersRef = useRef<string>(''); // Stringify filters for comparison

  const [popularSearches, setPopularSearches] = useState<PopularSearchItem[]>(
    [],
  );
  const [results, setResults] = useState<SearchedProduct[]>([]);
  const [unfilteredResults, setUnfilteredResults] = useState<SearchedProduct[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([]);
  const [recentViewed, setRecentViewed] = useState<SearchedProduct[]>([]);

  const {
    hasMore,
    limit,
    reset: resetPagination,
    setHasMore,
    incrementOffset,
    loadMore,
  } = usePagination({ limit: 18 });

  const { userId } = useUser();

  const guestSearchHistory = useSearchHistoryStore((s) => s.searchHistory);
  const guestViewedProducts = useViewedProductStore((s) => s.viewedProducts);

  const addGuestSearchHistory = useSearchHistoryStore(
    (s) => s.addSearchHistory,
  );
  const addGuestViewedProduct = useViewedProductStore(
    (s) => s.addViewedProduct,
  );

  const [hasFetchedPopular, setHasFetchedPopular] = useState(false);

  const fetchPopularSearches = useCallback(async () => {
    if (hasFetchedPopular) return;
    const data = await fetchPopularSearchesApi();
    setPopularSearches(data);
    setHasFetchedPopular(true);
  }, [hasFetchedPopular]);

  const fetchRecentSearchesAndViewed = useCallback(async () => {
    const { recentSearches, recentViewed } =
      await fetchRecentSearchesAndViewedApi(
        userId ?? undefined,
        guestSearchHistory,
        guestViewedProducts,
      );
    setRecentSearches(recentSearches);
    setRecentViewed(recentViewed);
  }, [userId, guestSearchHistory, guestViewedProducts]);

  useEffect(() => {
    fetchPopularSearches();
    fetchRecentSearchesAndViewed();
  }, [fetchPopularSearches, fetchRecentSearchesAndViewed]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    const sortKey = sort || '';
    const filtersKey = JSON.stringify(filters || {});

    if (!trimmedQuery) {
      if (results.length > 0) setResults([]);
      if (totalCount > 0) setTotalCount(0);
      if (loading) setLoading(false);
      resetPagination();
      lastQueryRef.current = '';
      lastSortRef.current = '';
      lastFiltersRef.current = '';
      return;
    }

    // Only skip if query, sort, and filters are all unchanged
    if (
      trimmedQuery === lastQueryRef.current &&
      sortKey === (lastSortRef.current || '') &&
      filtersKey === lastFiltersRef.current
    ) {
      return;
    }

    setLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (controllerRef.current) controllerRef.current.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    debounceRef.current = setTimeout(async () => {
      try {
        resetPagination();

        // Fetch filtered results
        const params = buildSearchParams(trimmedQuery, limit, 0, sort, filters);
        const res = await searchProductsApi(params, controller.signal);

        setResults(res.hits);
        setTotalCount(res.totalCount);
        setHasMore(res.hasMore);
        incrementOffset();

        // Fetch unfiltered results (no limit, sort, filter, offset)
        const unfilteredParams = buildSearchParams(trimmedQuery, 0, 0, '', {});
        const unfilteredRes = await searchProductsApi(unfilteredParams);
        setUnfilteredResults(unfilteredRes.hits);

        lastQueryRef.current = trimmedQuery;
        lastSortRef.current = sortKey;
        lastFiltersRef.current = filtersKey;
      } catch (err) {
        if (
          err instanceof Error &&
          err.name !== 'CanceledError' &&
          err.name !== 'AbortError'
        ) {
          console.error(err.message);
          setResults([]);
          setHasMore(false);
          setUnfilteredResults([]);
        }
      } finally {
        setLoading(false);

        if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
        saveDebounceRef.current = setTimeout(() => {
          addGuestSearchHistoryHelper(addGuestSearchHistory, trimmedQuery);

          setRecentSearches((prev) => {
            const exists = prev.some((item) => item.query === trimmedQuery);
            if (exists) return prev;
            const newItem: SearchHistoryItem = {
              id: Date.now().toString(),
              query: trimmedQuery,
              searchedAt: new Date().toISOString(),
            };
            return [newItem, ...prev].slice(0, 10);
          });
        }, 600);
      }
    }, 250);

    return () => {
      controllerRef.current?.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
    };
  }, [
    query,
    sort,
    limit,
    filters,
    addGuestSearchHistory,
    incrementOffset,
    loading,
    resetPagination,
    results.length,
    setHasMore,
    totalCount,
  ]);

  const loadMoreResults = useCallback(async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const newResults = await loadMore<SearchedProduct>(
      async (offset: number, limit: number) => {
        const params = buildSearchParams(
          trimmedQuery,
          limit,
          offset,
          sort,
          filters,
        );
        const res = await searchProductsApi(params);
        return {
          data: res.hits,
          hasMore: res.hasMore,
        };
      },
    );

    if (newResults && newResults.length > 0) {
      setResults((prev) => {
        const existingIds = new Set(prev.map((product) => product.id));
        const uniqueNewResults = newResults.filter(
          (product) => !existingIds.has(product.id),
        );
        return [...prev, ...uniqueNewResults];
      });
    }
  }, [query, loadMore, sort, filters]);

  const recordViewedProduct = useCallback(
    async (product: SearchedProduct) => {
      if (userId && product?.id) {
        await fetch('/api/search/viewedproduct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, SearchedProduct: product }),
        });
      } else if (!userId && product?.slug) {
        addGuestViewedProductHelper(addGuestViewedProduct, product);

        setRecentViewed((prev) => {
          const exists = prev.find((p) => p.id === product.id);
          if (exists) return prev;
          return [product, ...prev].slice(0, 10);
        });
      }
    },
    [userId, addGuestViewedProduct],
  );

  return {
    results,
    unfilteredResults,
    loading,
    popularSearches,
    recentSearches,
    recentViewed,
    recordViewedProduct,
    loadMoreResults,
    hasMore,
    totalCount,
  };
}
