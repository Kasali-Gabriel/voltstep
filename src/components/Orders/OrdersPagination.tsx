'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OrdersPaginationProps {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  totalFilteredPages: number;
  filteredStart: number;
  filteredEnd: number;
  totalFilteredOrders: number;
}

export function OrdersPagination({
  page,
  setPage,
  totalFilteredPages,
  filteredStart,
  filteredEnd,
  totalFilteredOrders,
}: OrdersPaginationProps) {
  if (totalFilteredPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-2">
      {page === 1 ? (
        <>
          <button
            className="mb-2 cursor-pointer rounded-full bg-black px-10 py-2 text-white hover:bg-neutral-900 disabled:opacity-50"
            onClick={() => setPage(2)}
            disabled={totalFilteredPages < 2}
            aria-label="Show more orders"
          >
            Load more
          </button>

          <span className="text-sm text-neutral-700">
            {filteredStart + 1} - {filteredEnd} of {totalFilteredOrders} orders
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
            {filteredStart + 1} - {filteredEnd} of {totalFilteredOrders} orders
          </span>

          <button
            className="cursor-pointer rounded-full bg-black p-2 text-white hover:bg-neutral-900 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-black"
            onClick={() => setPage((p) => Math.min(totalFilteredPages, p + 1))}
            disabled={page === totalFilteredPages}
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
