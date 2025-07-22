import { useCallback, useState } from 'react';

interface UsePaginationProps {
  limit?: number;
  initialOffset?: number;
}

interface PaginationState {
  offset: number;
  hasMore: boolean;
  loading: boolean;
}

export function usePagination({
  limit = 18,
  initialOffset = 0,
}: UsePaginationProps = {}) {
  const [state, setState] = useState<PaginationState>({
    offset: initialOffset,
    hasMore: true,
    loading: false,
  });

  const reset = useCallback(() => {
    setState((prev) => {
      if (
        prev.offset === initialOffset &&
        prev.hasMore === true &&
        prev.loading === false
      ) {
        return prev; // no change needed
      }

      return {
        offset: initialOffset,
        hasMore: true,
        loading: false,
      };
    });
  }, [initialOffset]);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  const setHasMore = useCallback((hasMore: boolean) => {
    setState((prev) => ({ ...prev, hasMore }));
  }, []);

  const incrementOffset = useCallback(() => {
    setState((prev) => ({ ...prev, offset: prev.offset + limit }));
  }, [limit]);

  const loadMore = useCallback(
    async <T>(
      fetchFn: (
        offset: number,
        limit: number,
      ) => Promise<{ data: T[]; hasMore: boolean }>,
    ) => {
      if (state.loading || !state.hasMore) return;

      setLoading(true);
      try {
        const result = await fetchFn(state.offset, limit);
        setHasMore(result.hasMore);
        incrementOffset();
        return result.data;
      } catch (error) {
        console.error('Pagination error:', error);
        setHasMore(false);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [
      state.offset,
      state.loading,
      state.hasMore,
      limit,
      setLoading,
      setHasMore,
      incrementOffset,
    ],
  );

  return {
    ...state,
    limit,
    reset,
    setLoading,
    setHasMore,
    incrementOffset,
    loadMore,
  };
}
