import { CatalogPagination, Product } from '@/types/product';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePagination } from './usePagination';

export const useCatalogPagination = ({
  isSearch,
  slug,
  sort,
  filters = {},
  initialProducts = [],
  initialTotalCount = 0,
  initialHasMore = false,
}: CatalogPagination) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount);
  const loadingRef = useRef(false);
  const didInitial = useRef(false);

  const {
    offset,
    hasMore,
    loading: paginationLoading,
    limit,
    reset: resetPagination,
    setLoading: setPaginationLoading,
    setHasMore,
    incrementOffset,
  } = usePagination({ limit: 18 });

  // Fetch products with pagination
  const fetchProducts = useCallback(
    async (offset: number, limit: number, isInitial = false) => {
      try {
        // Build params from filters and slug
        const params: Record<string, unknown> = { limit, offset, sort };
        if (Array.isArray(slug) && slug.length > 0) {
          params.catalog = slug[0];
        }
        if (Array.isArray(slug) && slug.length > 1) {
          params.category = slug[1];
        }
        if (Array.isArray(slug) && slug.length > 2) {
          params.subcategory = slug[2];
        }
        if (filters) {
          if (filters.priceRange) {
            params.minPrice = filters.priceRange[0];
            params.maxPrice = filters.priceRange[1];
          }
          if (filters.priceRanges && filters.priceRanges.length > 0) {
            params.priceRanges = filters.priceRanges
              .map(([min, max]) => `${min}-${max}`)
              .join(',');
          }
          if (filters.sizes && filters.sizes.length > 0) {
            params.sizes = filters.sizes.join(',');
          }
          if (filters.colors && filters.colors.length > 0) {
            params.colors = filters.colors.join(',');
          }
          if (filters.tags && filters.tags.length > 0) {
            params.tags = filters.tags.join(',');
          }
          if (filters.rating && filters.rating > 0) {
            params.rating = filters.rating;
          }
          if (filters.inStock) {
            params.inStock = 'true';
          }
        }

        const data = isSearch
          ? {
              products: [],
              totalCount: 0,
              hasMore: false,
            }
          : (await axios.get('/api/products', { params })).data;

        // Handle API response with products and unfilteredProducts
        const responseProducts = data.products || [];
        const responseTotalCount = data.totalCount || responseProducts.length;
        const responseHasMore = data.hasMore ?? false;

        // Update total count on initial load
        if (isInitial) {
          setTotalCount(responseTotalCount);
        }

        const processedProducts = Array.isArray(responseProducts)
          ? responseProducts.map((product: Product) => ({
              ...product,
              reviews: product.reviews ?? [],
            }))
          : [];

        if (isInitial) {
          setProducts(processedProducts);
        } else {
          setProducts((prev) => {
            // Create a Set of existing IDs to avoid duplicates
            const existingIds = new Set(prev.map((product) => product.id));
            // Filter out any products that already exist
            const uniqueNewProducts = processedProducts.filter(
              (product) => !existingIds.has(product.id),
            );
            return [...prev, ...uniqueNewProducts];
          });
          // Only update unfilteredProducts on initial load
        }

        return {
          data: processedProducts,
          hasMore: responseHasMore,
        };
      } catch (error) {
        console.error('Error fetching products:', error);
        return { data: [], hasMore: false };
      }
    },
    [slug, sort, filters, isSearch],
  );

  // Initial load & updates (only on filters/sort change)
  const stringifiedFilters = JSON.stringify(filters);

  useEffect(() => {
    if (isSearch) return;

    if (!didInitial.current) {
      didInitial.current = true;
      setProducts(initialProducts);
      setTotalCount(initialTotalCount);
      setHasMore(initialHasMore);
      incrementOffset();
      return;
    }

    const loadFiltered = async () => {
      setLoading(true);
      resetPagination();

      const result = await fetchProducts(0, limit, true);
      setHasMore(result.hasMore);
      incrementOffset();
      setLoading(false);
    };

    loadFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedFilters, sort, isSearch]);

  // Load more function
  const loadMore = useCallback(async () => {
    if (isSearch) return;
    if (paginationLoading || !hasMore || loadingRef.current) return;

    loadingRef.current = true;
    setPaginationLoading(true);

    try {
      const result = await fetchProducts(offset, limit);
      setHasMore(result.hasMore);
      incrementOffset();
    } finally {
      setPaginationLoading(false);
      // Add a small delay to prevent rapid successive calls
      setTimeout(() => {
        loadingRef.current = false;
      }, 100);
    }
  }, [
    isSearch,
    fetchProducts,
    paginationLoading,
    hasMore,
    offset,
    limit,
    setPaginationLoading,
    setHasMore,
    incrementOffset,
  ]);

  return {
    products,
    loading,
    hasMore,
    loadMore,
    isLoadingMore: paginationLoading,
    totalCount,
  };
};
