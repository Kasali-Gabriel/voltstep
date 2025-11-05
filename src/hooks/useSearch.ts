import { useCallback, useEffect, useRef, useState } from 'react';

import { useSearchHistoryStore, useViewedProductStore } from '@/lib/state';
import {
  PopularSearchItem,
  SearchedProduct,
  SearchHistoryItem,
  SearchParams,
} from '@/types/search';

import { useUserContext } from '@/context/UserContext';
import { buildSearchParams } from '@/utils/Search/buildSearchParam';
import {
  fetchPopularSearches,
  fetchRecentSearches,
  savePopularSearch,
  saveSearchHistory,
  searchProducts,
} from '@/utils/Search/searchApis';
import { useRouter } from 'next/navigation';
import { usePagination } from './usePagination';
import { useViewedProduct } from './useViewedProduct';

export const useSearch = ({
  slug,
  query,
  sort,
  filters = {},
  initialResults = [],
  initialTotalCount = 0,
  initialHasMore = false,
  skipInitialFetch = false,
}: SearchParams) => {
  const { userId } = useUserContext();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const saveDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef<string>(''); // Prevent re-searching same query
  const lastSortRef = useRef<string | undefined>(undefined);
  const lastFiltersRef = useRef<string>(''); // Stringify filters for comparison
  const didInitial = useRef(false);

  const [results, setResults] = useState<SearchedProduct[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount);
  const [popularSearches, setPopularSearches] = useState<PopularSearchItem[]>(
    [],
  );
  const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([]);
  const [recentViewed, setRecentViewed] = useState<SearchedProduct[]>([]);

  const router = useRouter();

  const addGuestSearchHistory = useSearchHistoryStore(
    (s) => s.addSearchHistory,
  );

  const guestSearchHistory = useSearchHistoryStore((s) => s.searchHistory);
  const guestViewedProducts = useViewedProductStore((s) => s.viewedProducts);

  const { fetchRecentViewed, recordViewedProduct } = useViewedProduct();

  useEffect(() => {
    async function fetchMetaData() {
      const popular = await fetchPopularSearches();
      setPopularSearches(popular);

      const recent = await fetchRecentSearches(userId, guestSearchHistory);
      setRecentSearches(recent);

      const viewed = await fetchRecentViewed(guestViewedProducts, true);
      setRecentViewed(viewed);
    }
    fetchMetaData();
  }, [userId, guestSearchHistory, guestViewedProducts, fetchRecentViewed]);

  const {
    hasMore,
    limit,
    reset: resetPagination,
    setHasMore,
    incrementOffset,
    loadMore,
  } = usePagination({ limit: 18 });

  // Initial load: skip fetch if flag is set and we have initial data
  useEffect(() => {
    if (skipInitialFetch && !didInitial.current) {
      didInitial.current = true;
      setResults(initialResults);
      setTotalCount(initialTotalCount);
      setHasMore(initialHasMore);
      setLoading(false);
      incrementOffset();
      return;
    }
  }, [
    skipInitialFetch,
    initialResults,
    initialTotalCount,
    initialHasMore,
    setHasMore,
    incrementOffset,
  ]);

  useEffect(() => {
    if (!query) return;

    if (Array.isArray(slug) && slug.length > 0) return;

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
        const res = await searchProducts(params, controller.signal);

        setResults(res.hits);
        setTotalCount(res.totalCount);
        setHasMore(res.hasMore);
        incrementOffset();

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
        }
      } finally {
        setLoading(false);
        // Save/search history and update popular searches after a longer pause
        if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);

        saveDebounceRef.current = setTimeout(async () => {
          if (userId) {
            await saveSearchHistory(userId, trimmedQuery);
            await savePopularSearch(trimmedQuery);
          } else {
            await savePopularSearch(trimmedQuery);

            addGuestSearchHistory({
              id: Date.now().toString(),
              query: trimmedQuery,
              searchedAt: new Date().toISOString(),
            });
          }
          // Refresh after save
          const popular = await fetchPopularSearches();
          const recent = await fetchRecentSearches(userId, guestSearchHistory);
          setPopularSearches(popular);
          setRecentSearches(recent);
        });
      }
    }, 250);

    return () => {
      controllerRef.current?.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
    };
  }, [
    userId,
    query,
    slug,
    router,
    sort,
    limit,
    filters,
    guestSearchHistory,
    addGuestSearchHistory,
    incrementOffset,
    loading,
    resetPagination,
    results.length,
    setHasMore,
    totalCount,
  ]);

  const loadMoreResults = useCallback(async () => {
    if (!query) return;

    if (Array.isArray(slug) && slug.length > 0) return;

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
        const res = await searchProducts(params);
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
  }, [query, loadMore, sort, filters, slug]);

  const recordViewedSearchProduct = useCallback(
    async (product: SearchedProduct) => {
      await recordViewedProduct(true, query, product);
      setRecentViewed((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        if (existingIds.has(product.id)) return prev;
        return [product, ...prev.slice(0, 7)];
      });
    },
    [recordViewedProduct, query],
  );

  return {
    results,
    loading,
    loadMoreResults,
    hasMore,
    totalCount,
    popularSearches,
    recentSearches,
    recentViewed,
    recordViewedSearchProduct,
  };
};
