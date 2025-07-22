'use client';

import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Filters from '@/components/Filters/Filters';
import ProductCard from '@/components/Product/ProductCard';
import ProductListHeader from '@/components/ProductList/ProductListHeader';
import Loader from '@/components/ui/loader';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useSortProducts } from '@/hooks/useSortProducts';
import { useSideBarStore } from '@/lib/state';
import { ProductListProps } from '@/types/product';
import { SearchedProduct } from '@/types/search';
import { mapProductToSearchedProduct } from '@/utils/mapProducts';
import ProductCardSkeleton from '../Skeletons/ProductCardSkeleton';

const ProductsList = ({
  query,
  products = [],
  unfilteredProducts,
  unfilteredSearch,
  slug,
  loading,
  hasMore,
  loadMore,
  totalCount = 0,
  searchResults = [],
}: ProductListProps) => {
  const [isMobile] = useIsMobile(900);
  const { showFilters } = useSideBarStore();
  const [isInitialMount, setIsInitialMount] = useState(true);
  // Get current sort, but not used directly here
  useSortProducts(!!query);

  // state to track if end of product list is in viewport
  const [atProductListEnd, setAtProductListEnd] = useState(false);
  // state for filter bottom offset
  const [filterBottomOffset, setFilterBottomOffset] = useState(0);

  // refs
  const productListEndRef = useRef<HTMLDivElement>(null);

  const notSubcategory = !slug || (Array.isArray(slug) && slug.length < 3);

  // Reset initial mount state when we have data or finished loading
  useEffect(() => {
    if (
      products.length > 0 ||
      (searchResults && searchResults.length > 0) ||
      (!loading && !query)
    ) {
      setIsInitialMount(false);
    }
  }, [products.length, searchResults, searchResults?.length, loading, query]);

  // Prepare products to display (no client-side sorting)
  const filteredResults: SearchedProduct[] =
    products.length > 0
      ? products.map(mapProductToSearchedProduct)
      : query
        ? searchResults || []
        : [];

  const unfilteredResults: SearchedProduct[] =
    (unfilteredProducts?.length ?? 0) > 0
      ? (unfilteredProducts?.map(mapProductToSearchedProduct) ?? [])
      : query
        ? (unfilteredSearch ?? [])
        : [];

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
        loading={loading}
        totalCount={totalCount}
      />
      <div className="flex w-full">
        <Filters
          atProductListEnd={atProductListEnd}
          filterBottomOffset={filterBottomOffset}
          slug={slug}
          unfilteredResults={unfilteredResults}
          loading={loading}
        />

        {/* Product grid */}
        <div
          className={`w-full px-5 transition-all duration-300 sm:px-10 xl:px-12 ${
            isMobile ? 'ml-0' : showFilters ? '-ml-0' : '-ml-[17rem]'
          }`}
        >
          {/* ProductList Loading skeleton for initial load */}
          {loading || isInitialMount ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-y-16 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} notSubcategory={notSubcategory} />
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <>
              {hasMore && loadMore ? (
                <InfiniteScroll
                  dataLength={filteredResults.length}
                  next={loadMore!}
                  hasMore={hasMore!}
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
                      isPage
                      query={!!query}
                      slug={slug}
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
                      query={!!query}
                      slug={slug}
                      isPage
                      notSubcategory={notSubcategory}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // No products found
            <p className="text-center text-neutral-500">No products found.</p>
          )}

          {/* End of product list marker */}

          <div ref={productListEndRef} style={{ height: 1, width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
