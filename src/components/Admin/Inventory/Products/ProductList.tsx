'use client';

import { AddButton } from '@/components/Buttons/AddButton';
import { BackButton } from '@/components/Buttons/BackButton';
import { DataTable } from '@/components/Tables/data-table';
import { Product, Subcategory } from '@/types/product';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import { getProductColumns } from './ProductColumn';

interface ProductListProps {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
  subcategory?: Subcategory;
  title: string;
}

const ProductList = ({
  products,
  pagination,
  subcategory,
  title,
}: ProductListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const [productsData, setProductsData] = useState<Product[]>(products);
  const [totalRows, setTotalRows] = useState(pagination.totalCount);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<ColumnFiltersState>([]);
  const [currentSorting, setCurrentSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subcategoryId = subcategory?.id;
  const subcategoryName = subcategory?.name;

  const fetchProducts = useCallback(
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

        const searchFilter = filters.find((f) => f.id === 'name');
        const search = (searchFilter?.value as string) || '';

        const sortBy = sorting[0]?.id || 'createdAt';
        const sortOrder = sorting[0]?.desc ? 'desc' : 'asc';

        const { data } = await axios.get('/api/admin/inventory/products', {
          params: {
            page: actualPageIndex + 1,
            pageSize: actualPageSize,
            search,
            sortBy: hasActiveFilters ? undefined : sortBy, // Don't sort server-side when filters are active
            sortOrder: hasActiveFilters ? undefined : sortOrder,
            subcategoryId,
          },
        });

        setProductsData(data.products);
        setTotalRows(data.totalCount);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [subcategoryId],
  );

  const handleAddProduct = async (data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    subcategoryId: string;
  }) => {
    setIsSubmitting(true);
    try {
      const product: Product = await axios.post(
        '/api/admin/inventory/products',
        data,
      );

      setIsSubmitting(false);
      setIsAddingProduct(false);

      router.push(`/admin/inventory/products/${product.slug}`);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleCancel = () => {
    setIsAddingProduct(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        fetchProducts(
          pagination.pageIndex,
          pagination.pageSize,
          currentFilters,
          sortingForRequest,
        );
      }
      // If filters are active, DataTable handles pagination client-side automatically
    },
    [fetchProducts, currentFilters, currentSorting],
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
          fetchProducts(0, 10, filters, [], true);
        } else {
          // When filters are cleared, go back to server-side pagination and sorting
          fetchProducts(0, 10, filters, currentSorting);
        }
      }, 300); // 300ms debounce

      setDebounceTimer(timer);
    },
    [fetchProducts, currentSorting, debounceTimer],
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
        fetchProducts(0, 10, currentFilters, sorting);
      }
      // If filters are active, DataTable handles sorting client-side automatically
    },
    [fetchProducts, currentFilters],
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

  // Close product form when route changes
  useEffect(() => {
    setIsAddingProduct(false);
  }, [pathname, searchParamsString]);

  const columns = getProductColumns(!subcategoryId);

  return (
    <div className="w-full">
      {isAddingProduct ? (
        <AddProduct
          handleCancel={handleCancel}
          onSubmit={handleAddProduct}
          isSubmitting={isSubmitting}
          title={title}
          subcategoryName={subcategoryName ?? ''}
        />
      ) : (
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

            <BackButton />
          </div>

          <DataTable
            columns={columns}
            data={productsData}
            enableFiltering={true}
            filterColumns={['name']}
            inputPlaceholder="Search products by name..."
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
            rowProps={(row) => ({
              onClick: (e) => {
                // Don't navigate if clicking on the select column
                const target = e.target as HTMLElement;
                const selectCell = target.closest('.select-column');
                if (selectCell) {
                  return;
                }
                router.push(`/admin/inventory/products/${row.original.slug}`);
              },
              className:
                'cursor-pointer hover:bg-muted transition-colors duration-150',
            })}
          >
            <AddButton setIsProductFormOpen={setIsAddingProduct} />
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default ProductList;
