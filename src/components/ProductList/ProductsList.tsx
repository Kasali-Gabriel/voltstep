'use client';

import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Filters from '@/components/Filters/Filters';
import ProductCard from '@/components/Product/ProductCard';
import ProductListHeader from '@/components/ProductList/ProductListHeader';
import Loader from '@/components/ui/loader';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useSortProducts } from '@/hooks/useSortProducts';
import { useSideBarStore, useViewedProductStore } from '@/lib/state';
import { SearchedProduct } from '@/types/search';
import { mapProductToSearchedProduct } from '@/utils/Product/mapProducts';
import ProductCardSkeleton from '../Skeletons/ProductCardSkeleton';

import { useCatalogPagination } from '@/hooks/useCatalogPagination';
import { useSearch } from '@/hooks/useSearch';
import { useViewedProduct } from '@/hooks/useViewedProduct';
import { Product, ProductsListProps } from '@/types/product';
import RecentlyViewedProducts from './RecentlyViewedProducts';

const ProductsList = ({
  query,
  filters,
  slug,
  initialProducts,
  initialTotalCount,
  initialHasMore,
}: ProductsListProps) => {
  const [isMobile] = useIsMobile(900);
  const { showFilters } = useSideBarStore();

  const { currentSort: rawSort } = useSortProducts(!!query);
  const currentSort = rawSort;

  const { fetchRecentViewed } = useViewedProduct();

  const guestViewedProducts = useViewedProductStore((s) => s.viewedProducts);

  // State for products, unfilteredProducts, totalCount, hasMore, loading
  const [products, setProducts] = useState<(Product | SearchedProduct)[]>(
    initialProducts ?? [],
  );
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount ?? 0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  // state to track if end of product list is in viewport
  const [atProductListEnd, setAtProductListEnd] = useState(false);
  // state for filter bottom offset
  const [filterBottomOffset, setFilterBottomOffset] = useState(0);
  // Set isInitialMount to false if initialProducts are present (SSR/SSG)
  const [isInitialMount, setIsInitialMount] = useState(
    !(initialProducts && initialProducts.length > 0),
  );
  const [recentViewed, setRecentViewed] = useState<SearchedProduct[]>([]);

  const productListEndRef = useRef<HTMLDivElement>(null);

  const isSearch = !!query;

  const search = useSearch({
    slug: isSearch ? [] : slug,
    query: query ?? '',
    sort: currentSort,
    filters,
    initialResults: initialProducts as SearchedProduct[],
    initialTotalCount: initialTotalCount,
    initialHasMore: initialHasMore,
    skipInitialFetch: isInitialMount,
  });

  const catalogPagination = useCatalogPagination({
    isSearch: isSearch,
    slug: isSearch ? [] : slug,
    sort: isSearch ? undefined : currentSort,
    filters: isSearch ? {} : filters,
    initialProducts: isSearch ? [] : (initialProducts as Product[]),

    initialTotalCount: isSearch ? 0 : initialTotalCount,
    initialHasMore: isSearch ? false : initialHasMore,
    skipInitialFetch: isInitialMount,
  });

  const notSubcategory = !slug || (Array.isArray(slug) && slug.length < 3);

  // Sync state from the correct hook after initial mount and when filters/query/slug change
  useEffect(() => {
    if (!isInitialMount) {
      if (isSearch) {
        setProducts(search.results ?? []);
        setTotalCount(search.totalCount ?? 0);
        setHasMore(search.hasMore ?? true);
        setLoading(search.loading ?? false);
      } else {
        setProducts(catalogPagination.products);
        setTotalCount(catalogPagination.totalCount);
        setHasMore(catalogPagination.hasMore);
        setLoading(catalogPagination.loading);
      }
    }
  }, [
    isInitialMount,
    isSearch,
    search.results,
    search.totalCount,
    search.hasMore,
    search.loading,
    catalogPagination.products,
    catalogPagination.totalCount,
    catalogPagination.hasMore,
    catalogPagination.loading,
    filters,
    query,
    slug,
  ]);

  useEffect(() => {
    const fetchViewed = async () => {
      const viewed = await fetchRecentViewed(guestViewedProducts);
      setRecentViewed(viewed);
    };
    fetchViewed();
  }, [fetchRecentViewed, guestViewedProducts]);

  // Reset initial mount state when we have data or finished loading
  useEffect(() => {
    const hasData = isSearch
      ? search.results && search.results.length > 0
      : products.length > 0;
    if (hasData || (!loading && !query)) {
      setIsInitialMount(false);
    }
  }, [
    products.length,
    search.results,
    search.results?.length,
    loading,
    query,
    isSearch,
  ]);

  // Prepare products to display (no client-side sorting)
  const filteredResults: SearchedProduct[] = isSearch
    ? search.results || []
    : products.length > 0 && 'images' in products[0]
      ? (products as Product[]).map(mapProductToSearchedProduct)
      : (products as SearchedProduct[]);

  const unfilteredResults: SearchedProduct[] = (initialProducts ?? []).map(
    (product) =>
      'images' in product
        ? mapProductToSearchedProduct(product as Product)
        : (product as SearchedProduct),
  );

  // Observe end of product list
  useEffect(() => {
    const el = productListEndRef.current;
    if (!el) return;

    const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
      setAtProductListEnd(entry.isIntersecting);
      if (entry.isIntersecting) {
        // Calculate distance from bottom of viewport to bottom of product grid
        const rect = el.getBoundingClientRect();
        const offset = window.innerHeight - rect.bottom;
        setFilterBottomOffset(offset > 0 ? offset : 0);
      } else {
        setFilterBottomOffset(0);
      }
    };

    // Continuously update filterBottomOffset while at product list end
    const updateBottomOffset = () => {
      if (atProductListEnd && el) {
        const rect = el.getBoundingClientRect();
        const offset = window.innerHeight - rect.bottom;
        setFilterBottomOffset(offset > 0 ? offset : 0);
      }
    };

    const observer = new window.IntersectionObserver(handleIntersect, {
      threshold: 0.01,
    });
    observer.observe(el);

    // Add scroll listener for continuous updates when at product list end
    if (atProductListEnd) {
      window.addEventListener('scroll', updateBottomOffset, { passive: true });
      window.addEventListener('resize', updateBottomOffset, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateBottomOffset);
      window.removeEventListener('resize', updateBottomOffset);
    };
  }, [filteredResults.length, loading, atProductListEnd]);

  // Hide filters on mobile
  useEffect(() => {
    if (isMobile) {
      const { setShowFilters } = useSideBarStore.getState();
      setShowFilters(false);
    }
  }, [isMobile]);

  return (
    <div
      className={`flex flex-col ${query ? (isMobile ? 'mt-3' : 'mt-0') : 'mt-5'}`}
    >
      {/* Search query header - desktop */}
      {query && !isMobile && (
        <div className="flex items-center space-x-2 px-5 pt-1 sm:px-10 xl:px-12">
          <h1 className={`text-sm font-medium text-neutral-700 sm:text-base`}>
            Search results for
          </h1>
        </div>
      )}

      {/* Productlist header */}
      <ProductListHeader
        query={query}
        slug={slug}
        isMobile={isMobile}
        loading={isSearch ? search.loading : loading}
        totalCount={isSearch ? search.totalCount : totalCount}
      />

      <div className="flex w-full">
        <Filters
          atProductListEnd={atProductListEnd}
          filterBottomOffset={filterBottomOffset}
          slug={slug}
          unfilteredResults={unfilteredResults}
        />

        {/* Product grid */}
        <div
          className={`w-full overflow-x-hidden px-5 transition-all duration-300 sm:px-10 xl:px-12 ${
            isMobile ? 'ml-0' : showFilters ? '-ml-0' : '-ml-[17rem]'
          }`}
        >
          {/* ProductList Loading skeleton for initial load */}
          {(isSearch ? search.loading : loading) && isInitialMount ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-y-16 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} notSubcategory={notSubcategory} />
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <>
              {(isSearch ? search.hasMore : hasMore) &&
              (isSearch
                ? search.loadMoreResults
                : catalogPagination.loadMore) ? (
                <InfiniteScroll
                  dataLength={filteredResults.length}
                  next={
                    isSearch
                      ? search.loadMoreResults!
                      : catalogPagination.loadMore!
                  }
                  hasMore={isSearch ? search.hasMore! : hasMore!}
                  loader={
                    <div className="col-span-2 flex items-center justify-center py-8 lg:col-span-3">
                      <Loader size={40} borderWidth="2px" color="#000000" />
                    </div>
                  }
                  className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-y-16 lg:grid-cols-3"
                  scrollThreshold={0.8}
                  style={{ overflow: 'visible' }}
                >
                  {filteredResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      SearchedProduct={product}
                      slug={slug}
                      loading={loading}
                      notSubcategory={notSubcategory}
                    />
                  ))}
                </InfiniteScroll>
              ) : (
                // Regular product cards without infinite scroll
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-y-16 lg:grid-cols-3">
                  {filteredResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      SearchedProduct={product}
                      slug={slug}
                      loading={loading}
                      notSubcategory={notSubcategory}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // No products found
            <p className="flex flex-col gap-1 font-medium">
              <span className="sm:text-lg md:text-xl">
                No results match your filters.
              </span>
              <span className="text-muted-foreground text-sm italic sm:text-base md:text-lg">
                Try adjusting or resetting your filters to see more products.
              </span>
            </p>
          )}

          {/* Recently viewed products */}
          <div className="max-w-auto mt-28">
            {recentViewed ? (
              <RecentlyViewedProducts
                recentViewed={recentViewed}
                noPadding={true}
              />
            ) : (
              <div className="flex w-full flex-row gap-4 overflow-x-auto pb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <ProductCardSkeleton key={i} notSubcategory={true} />
                ))}
              </div>
            )}
          </div>

          {/* End of product list marker */}

          <div ref={productListEndRef} style={{ height: 1, width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
