import { useUser } from '@/context/UserContext';
import { useSearchHistoryStore, useViewedProductStore } from '@/lib/state';
import type {
  PopularSearchItem,
  SearchedProduct,
  SearchHistoryItem,
} from '@/types/search';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useSearch({ query }: { query: string }) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const saveDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [popularSearches, setPopularSearches] = useState<PopularSearchItem[]>(
    [],
  );
  const [results, setResults] = useState<SearchedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([]);
  const [recentViewed, setRecentViewed] = useState<SearchedProduct[]>([]);
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const { userId } = useUser();

  const guestSearchHistory = useSearchHistoryStore((s) => s.searchHistory);

  const guestViewedProducts = useViewedProductStore((s) => s.viewedProducts);

  const addGuestSearchHistory = useSearchHistoryStore(
    (s) => s.addSearchHistory,
  );

  const addGuestViewedProduct = useViewedProductStore(
    (s) => s.addViewedProduct,
  );

  // Fetch popular searches
  const fetchPopularSearches = useCallback(async () => {
    try {
      const res = await axios.get('/api/search/popular');

      setPopularSearches(Array.isArray(res.data) ? res.data : []);
    } catch {
      setPopularSearches([]);
    }
  }, []);

  const fetchRecentSearchesAndViewed = useCallback(async () => {
    if (!userId) {
      setRecentSearches(guestSearchHistory);
      setRecentViewed(guestViewedProducts.map((item) => item.product));

      return;
    }

    try {
      const [searchRes, viewedRes] = await Promise.all([
        axios.get('/api/search/history', { params: { userId } }),
        axios.get('/api/search/viewedproduct', { params: { userId } }),
      ]);

      setRecentSearches(searchRes.data.recentSearches || []);
      setRecentViewed(viewedRes.data || []);
    } catch (err) {
      console.error('Error fetching recent searches or viewed products:', err);

      setRecentSearches([]);
      setRecentViewed([]);
    }
  }, [userId, guestSearchHistory, guestViewedProducts]);

  // Fetch on mount
  useEffect(() => {
    (async () => {
      await fetchPopularSearches();
      await fetchRecentSearchesAndViewed();
    })();
  }, [fetchPopularSearches, fetchRecentSearchesAndViewed]);

  // // Load suggestions on mount
  // useEffect(() => {
  //   setSuggestions(suggestionsData);
  // }, []);

  // // Filter suggestions as user types
  // useEffect(() => {
  //   const trimmedQuery = query.trim().toLowerCase();
  //   if (!trimmedQuery) {
  //     setFilteredSuggestions([]);
  //     return;
  //   }
  //   setFilteredSuggestions(
  //     suggestions
  //       .filter((s) => s.toLowerCase().includes(trimmedQuery))
  //       .slice(0, 10),
  //   );
  // }, [query, suggestions]);

  // Debounced search and save
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (controllerRef.current) controllerRef.current.abort();

    const controller = new AbortController();

    controllerRef.current = controller;

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get('/api/search', {
          params: { q: trimmedQuery },
          signal: controller.signal,
        });

        setResults(res.data.hits);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
            console.error(err.message);
            setResults([]);
          }
        }
      } finally {
        setLoading(false);
        // Save/search history and update popular searches after a longer pause
        if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);

        saveDebounceRef.current = setTimeout(async () => {
          if (userId) {
            await Promise.all([
              axios.post('/api/search/history', {
                userId,
                query: trimmedQuery,
              }),

              axios.post('/api/search/popular', {
                query: trimmedQuery,
              }),
            ]);
          } else {
            addGuestSearchHistory({
              id: Date.now().toString(),
              query: trimmedQuery,
              searchedAt: new Date().toISOString(),
            });
          }
          // Refresh after save
          await fetchPopularSearches();
          await fetchRecentSearchesAndViewed();
        }, 600); // 600ms pause before saving
      }
    }, 250); // 250ms debounce for search
    return () => {
      controllerRef.current?.abort();

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
    };
  }, [
    query,
    userId,
    addGuestSearchHistory,
    fetchPopularSearches,
    fetchRecentSearchesAndViewed,
  ]);

  // Record viewed product
  const recordViewedProduct = useCallback(
    async (SearchedProduct: SearchedProduct) => {
      if (userId && SearchedProduct?.id) {
        await axios.post('/api/search/viewedproduct', {
          userId,
          SearchedProduct,
        });
      } else if (!userId && SearchedProduct?.slug) {
        addGuestViewedProduct({
          id: Date.now().toString(),
          viewedAt: new Date().toISOString(),
          product: SearchedProduct,
        });
      }
    },
    [userId, addGuestViewedProduct],
  );

  return {
    results,
    loading,
    popularSearches,
    recentSearches,
    recentViewed,
    recordViewedProduct,
    // suggestions: filteredSuggestions,
  };
}
