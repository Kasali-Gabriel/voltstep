import axios from '@/lib/axios';
import { Product } from '@/types/product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePagination } from './usePagination';

import { ProductFilters } from '@/utils/productFilters';

export function useCatalogPagination({
  slug,
  sort,
  filters = {},
}: {
  slug?: string[];
  sort?: string;
  filters?: ProductFilters;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [unfilteredProducts, setUnfilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const loadingRef = useRef(false);

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

  // Build API URL based on slug
  const buildUrl = useCallback((slug?: string[]) => {
    let url = '/api/products';

    if (Array.isArray(slug)) {
      if (slug.length === 1) {
        url = `/api/products/catalog?catalog=${slug[0]}`;
      } else if (slug.length === 2) {
        url = `/api/products/catalog/categories?catalog=${slug[0]}&category=${slug[1]}`;
      } else if (slug.length === 3) {
        url = `/api/products/catalog/categories/subcategories?catalog=${slug[0]}&category=${slug[1]}&subcategory=${slug[2]}`;
      }
    }

    return url;
  }, []);

  // Fetch products with pagination
  const fetchProducts = useCallback(
    async (offset: number, limit: number, isInitial = false) => {
      try {
        const url = buildUrl(slug);
        // Build params from filters
        const params: Record<string, unknown> = { limit, offset, sort };
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
        const { data } = await axios.get(url, {
          params,
        });

        // Handle API response with products and unfilteredProducts
        const responseProducts = data.products || [];
        const responseUnfilteredProducts = data.unfilteredProducts || [];
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

        const processedUnfilteredProducts = Array.isArray(
          responseUnfilteredProducts,
        )
          ? responseUnfilteredProducts.map((product: Product) => ({
              ...product,
              reviews: product.reviews ?? [],
            }))
          : [];

        if (isInitial) {
          setProducts(processedProducts);
          setUnfilteredProducts(processedUnfilteredProducts);
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
          unfilteredProducts: processedUnfilteredProducts,
          hasMore: responseHasMore,
        };
      } catch (error) {
        console.error('Error fetching products:', error);
        return { data: [], hasMore: false };
      }
    },
    [slug, buildUrl, sort, filters],
  );

  // Initial load
  useEffect(() => {
    if (!slug) return;

    const loadInitialProducts = async () => {
      setLoading(true);
      setTotalCount(0); 
      resetPagination();

      const result = await fetchProducts(0, limit, true);
      setHasMore(result.hasMore);
      incrementOffset();
      setLoading(false);
    };

    loadInitialProducts();
  }, [
    slug,
    fetchProducts,
    limit,
    resetPagination,
    setHasMore,
    incrementOffset,
  ]);

  // Load more function
  const loadMore = useCallback(async () => {
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
    unfilteredProducts,
    loading,
    hasMore,
    loadMore,
    isLoadingMore: paginationLoading,
    totalCount,
  };
}
