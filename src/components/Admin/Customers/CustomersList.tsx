'use client';

import {
  DataTable,
  defaultFormatColumnLabel,
} from '@/components/Tables/data-table';
import { useAdminSidebarStore } from '@/lib/state';
import { Customer } from '@/types/admin';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { columns } from './CustomerColumns';

const CustomersList = ({
  initialCustomers,
  totalCount,
}: {
  initialCustomers: Customer[];
  totalCount: number;
}) => {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [totalRows, setTotalRows] = useState(totalCount);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<ColumnFiltersState>([]);
  const [currentSorting, setCurrentSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true }, // Initialize with default server sorting
  ]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const { showSidebar } = useAdminSidebarStore();

  const fetchCustomers = useCallback(
    async (
      pageIndex: number = 0,
      pageSize: number = 10,
      filters: ColumnFiltersState = [],
      sorting: SortingState = [],
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

        const { data } = await axios.post('/api/admin/customers', {
          pageIndex: actualPageIndex,
          pageSize: actualPageSize,
          filters: filters.filter((f) =>
            typeof f.value === 'string' ? f.value.trim() : f.value,
          ),
          sorting: hasActiveFilters ? [] : sorting, // Don't sort server-side when filters are active
        });

        setCustomers(data.customers);
        setTotalRows(data.totalCount);
      } catch (error) {
        console.error('Error fetching customers:', error);
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
        fetchCustomers(
          pagination.pageIndex,
          pagination.pageSize,
          currentFilters,
          sortingForRequest,
        );
      }
      // If filters are active, DataTable handles pagination client-side automatically
    },
    [fetchCustomers, currentFilters, currentSorting],
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
          fetchCustomers(0, 10, filters, [], true);
        } else {
          // When filters are cleared, go back to server-side pagination and sorting
          fetchCustomers(0, 10, filters, currentSorting);
        }
      }, 300); // 300ms debounce

      setDebounceTimer(timer);
    },
    [fetchCustomers, currentSorting, debounceTimer],
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
        fetchCustomers(0, 10, currentFilters, sorting);
      }
      // If filters are active, DataTable handles sorting client-side automatically
    },
    [fetchCustomers, currentFilters],
  );

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
    <div className="container mx-auto max-w-7xl">
      <h2 className="text-lg font-semibold sm:text-xl xl:text-2xl">
        Customers Table
      </h2>

      <div className={`-mt-10 ${showSidebar ? 'lg:mt-4' : 'md:mt-4'}`}>
        <DataTable
          columns={columns}
          data={customers}
          enableFiltering={true}
          filterColumns={['firstName', 'email']}
          inputPlaceholder="Search customers by name or email "
          paginationMode={paginationMode}
          filteringMode="server"
          sortingMode={sortingMode}
          visibilityOptions={true}
          initialSorting={currentSorting}
          totalRows={totalRows}
          isLoading={isLoading}
          onPaginationChange={handlePaginationChange}
          onFilteringChange={handleFilteringChange}
          onSortingChange={handleSortingChange}
          formatLabel={(id) =>
            id === 'createdAt' ? 'Date Joined' : defaultFormatColumnLabel(id)
          }
          rowProps={(row) => ({
            onClick: () => router.push(`/admin/customers/${row.original.id}`),
            className:
              'cursor-pointer hover:bg-muted transition-colors duration-150',
          })}
        />
      </div>
    </div>
  );
};

export default CustomersList;
