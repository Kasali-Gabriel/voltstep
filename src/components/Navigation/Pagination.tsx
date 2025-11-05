import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
  scrollRef?: React.RefObject<HTMLElement | null>;
}

interface PaginationProps {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
  start: number;
  end: number;
  totalItems: number;
  itemLabel?: string;
}

export function usePagination({
  totalItems,
  pageSize = 10,
  initialPage = 1,
  scrollRef,
}: UsePaginationOptions) {
  const [page, setPage] = useState(initialPage);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  );
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalItems);

  // Handle scroll behavior
  const prevPage = useRef(page);
  useEffect(() => {
    if (page !== prevPage.current && scrollRef?.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    prevPage.current = page;
  }, [page, scrollRef]);

  // Reset page if totalItems or pageSize changes and page is out of range
  const safeSetPage = useCallback(
    (newPage: number | ((prev: number) => number)) => {
      setPage((prev) => {
        const nextPage =
          typeof newPage === 'function' ? newPage(prev) : newPage;
        if (nextPage < 1) return 1;
        if (nextPage > totalPages) return totalPages;
        return nextPage;
      });
    },
    [totalPages],
  );

  return {
    page,
    setPage: safeSetPage,
    totalPages,
    start,
    end,
    totalItems,
    pageSize,
  };
}

export const Pagination = ({
  page,
  setPage,
  totalPages,
  start,
  end,
  totalItems,
  itemLabel = 'items',
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-2">
      {page === 1 ? (
        <>
          <button
            className="mb-2 cursor-pointer rounded-full bg-black px-10 py-2 text-white hover:bg-neutral-900 disabled:opacity-50"
            onClick={() => setPage(2)}
            disabled={totalPages < 2}
            aria-label={`Show more ${itemLabel}`}
          >
            Load more
          </button>

          <span className="text-sm text-neutral-700">
            {start + 1} - {end} of {totalItems} {itemLabel}
          </span>
        </>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <button
            className="cursor-pointer rounded-full bg-black p-2 text-white hover:bg-neutral-800 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>

          <span className="text-sm text-neutral-700">
            {start + 1} - {end} of {totalItems} {itemLabel}
          </span>

          <button
            className="cursor-pointer rounded-full bg-black p-2 text-white hover:bg-neutral-900 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-black"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};
