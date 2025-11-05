'use client';

import StatusFilter from '@/components/Admin/Orders/StatusFilter';
import { DataTable } from '@/components/Tables/data-table';
import { useAdminSidebarStore } from '@/lib/state';
import { Order } from '@/types/order';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { columns } from './OrdersColumn';

interface OrderListProps {
  orders: Order[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  initialStatus: string;
}

const OrderList = ({ orders, pagination, initialStatus }: OrderListProps) => {
  const router = useRouter();
  const [ordersData, setOrdersData] = useState<Order[]>(orders);
  const [totalRows, setTotalRows] = useState(pagination.totalItems);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<ColumnFiltersState>([]);
  const [currentSorting, setCurrentSorting] = useState<SortingState>([
    { id: 'confirmedAt', desc: true }, // This matches the column accessor, server uses createdAt by default
  ]);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const { showSidebar } = useAdminSidebarStore();

  const fetchOrders = useCallback(
    async (
      pageIndex: number = 0,
      pageSize: number = 10,
      filters: ColumnFiltersState = [],
      sorting: SortingState = [],
      statusFilterParam: string = 'all',
      forceFetchAll: boolean = false,
    ) => {
      setIsLoading(true);
      try {
        const hasActiveFilters = filters.some(
          (filter) =>
            filter.value &&
            (typeof filter.value === 'string'
              ? filter.value.trim()
              : filter.value),
        );

        // When filters are active, fetch all results for proper client-side sorting
        // When no filters, use pagination for performance
        const actualPageSize =
          forceFetchAll || hasActiveFilters ? 10000 : pageSize; // Large number to get all results
        const actualPageIndex =
          forceFetchAll || hasActiveFilters ? 0 : pageIndex;

        const { data } = await axios.post('/api/admin/orders', {
          pageIndex: actualPageIndex,
          pageSize: actualPageSize,
          filters: filters.filter((f) =>
            typeof f.value === 'string' ? f.value.trim() : f.value,
          ),
          sorting: hasActiveFilters ? [] : sorting, // Don't sort server-side when filters are active
          statusFilter: statusFilterParam,
        });

        setOrdersData(data.orders);
        setTotalRows(data.totalCount);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      const hasActiveFilters = currentFilters.some(
        (filter) =>
          filter.value &&
          (typeof filter.value === 'string'
            ? filter.value.trim()
            : filter.value),
      );

      // If there are active filters, we have all data loaded, so no server request needed
      if (!hasActiveFilters) {
        const sortingForRequest = currentSorting;
        fetchOrders(
          pagination.pageIndex,
          pagination.pageSize,
          currentFilters,
          sortingForRequest,
          statusFilter,
        );
      }
      // If filters are active, DataTable handles pagination client-side automatically
    },
    [fetchOrders, currentFilters, currentSorting, statusFilter],
  );

  const handleFilteringChange = useCallback(
    (filters: ColumnFiltersState) => {
      setCurrentFilters(filters);

      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set new timer for debounced search
      const timer = setTimeout(() => {
        const hasActiveFilters = filters.some(
          (filter) =>
            filter.value &&
            (typeof filter.value === 'string'
              ? filter.value.trim()
              : filter.value),
        );

        if (hasActiveFilters) {
          // When filters become active, fetch all results for client-side sorting
          fetchOrders(0, 10, filters, [], statusFilter, true);
        } else {
          // When filters are cleared, go back to server-side pagination and sorting
          fetchOrders(0, 10, filters, currentSorting, statusFilter);
        }
      }, 300); // 300ms debounce

      setDebounceTimer(timer);
    },
    [fetchOrders, currentSorting, statusFilter, debounceTimer],
  );

  const handleSortingChange = useCallback(
    (sorting: SortingState) => {
      setCurrentSorting(sorting);

      // If there are active filters, sorting is handled client-side automatically
      // If no filters, make server request for sorting
      const hasActiveFilters = currentFilters.some(
        (filter) =>
          filter.value &&
          (typeof filter.value === 'string'
            ? filter.value.trim()
            : filter.value),
      );

      if (!hasActiveFilters) {
        fetchOrders(0, 10, currentFilters, sorting, statusFilter);
      }
      // If filters are active, DataTable handles sorting client-side automatically
    },
    [fetchOrders, currentFilters, statusFilter],
  );

  // Handle status filter change
  const handleStatusChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    // Clear filters when status changes but maintain current sorting
    setCurrentFilters([]);
    fetchOrders(0, 10, [], currentSorting, newStatus);
  };

  // Determine modes based on whether filters are active
  // When filters are active: fetch all results, use client-side sorting & pagination
  // When no filters: use server-side sorting & pagination for performance
  const hasActiveFilters = currentFilters.some(
    (filter) =>
      filter.value &&
      (typeof filter.value === 'string' ? filter.value.trim() : filter.value),
  );
  const sortingMode = hasActiveFilters ? 'client' : 'server';
  const paginationMode = hasActiveFilters ? 'client' : 'server';

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return (
    <div ref={scrollRef} className="w-full">
      <h2 className="text-2xl font-bold tracking-tight">Orders</h2>

      <div className={`-mt-10 ${showSidebar ? 'lg:mt-4' : 'md:mt-4'}`}>
        <DataTable
          columns={columns}
          data={ordersData}
          enableFiltering={true}
          filterColumns={['id', 'user']}
          inputPlaceholder="Search by order ID, customer name, or email..."
          paginationMode={paginationMode}
          filteringMode="server"
          sortingMode={sortingMode}
          visibilityOptions={false}
          initialSorting={currentSorting}
          totalRows={totalRows}
          isLoading={isLoading}
          onPaginationChange={handlePaginationChange}
          onFilteringChange={handleFilteringChange}
          onSortingChange={handleSortingChange}
          rowProps={(row) => ({
            onClick: () =>
              row.original.status === 'PENDING'
                ? undefined
                : router.push(`/admin/orders/${row.original.id}`),
            className: ` ${
              row.original.status === 'PENDING'
                ? 'pointer-events-none'
                : 'cursor-pointer hover:bg-muted transition-colors duration-150'
            }`,
          })}
        >
          <StatusFilter value={statusFilter} onChange={handleStatusChange} />
        </DataTable>
      </div>
    </div>
  );
};

export default OrderList;
