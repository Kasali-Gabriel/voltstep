'use client';

import SliderIcon from '@/assets/sliders-simple-svgrepo-com.svg';
import {
  useNavBarStore,
  useProductHeaderStore,
  useSideBarStore,
} from '@/lib/state';
import { ProductListHeaderProps } from '@/types/product';
import { getSubcat } from '@/utils/Product/getSubcat';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SortProducts from './SortProducts';

const ProductListHeader = ({
  loading,
  query,
  slug,
  isMobile,
  totalCount = 0,
}: ProductListHeaderProps) => {
  const { showFilters, setShowFilters } = useSideBarStore();
  const { navbarHeight, showNavBar, isFixed } = useNavBarStore();
  const {
    productHeaderStuck,
    setProductHeaderStuck,
    setProductHeaderHeight,
    productHeaderHeight,
  } = useProductHeaderStore();

  // States for sticky header behavior (only local state needed)
  const [currentHeaderOffset, setCurrentHeaderOffset] = useState(0);

  // Refs for sticky header logic
  const productHeaderRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const toggleSideBar = () => setShowFilters(!showFilters);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setCurrentHeaderOffset(showNavBar && isFixed ? navbarHeight : 0);
  }, [showNavBar, isFixed, navbarHeight, query, slug]);

  // Track productHeader height after initial render
  useEffect(() => {
    if (productHeaderRef.current) {
      const height = productHeaderRef.current.offsetHeight;
      setProductHeaderHeight(height);
    }
  }, [setProductHeaderHeight, query, slug]);

  useEffect(() => {
    if (!productHeaderRef.current) return;

    // First set to 'auto' so layout recalculates
    productHeaderRef.current.style.height = 'auto';

    // Wait for next frame to let browser render the "auto" height
    requestAnimationFrame(() => {
      const height = productHeaderRef.current?.offsetHeight ?? 0;
      setProductHeaderHeight(height);
    });
  }, [query, slug, setProductHeaderHeight]);

  // Sticky header logic
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setProductHeaderStuck(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: `-${currentHeaderOffset + 5}px`,
      },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [setProductHeaderStuck, currentHeaderOffset]);

  return (
    <>
      {/* Sentinel triggers exactly when header becomes sticky */}
      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

      <div
        ref={productHeaderRef}
        id="product-header"
        style={{
          top: currentHeaderOffset,
          height:
            productHeaderHeight && !isMobile
              ? `${productHeaderHeight}px`
              : 'auto',
        }}
        className={`sticky z-40 flex w-full flex-col ${isMobile ? 'mb-10' : 'mb-7'} bg-white ${query ? (isMobile ? 'py-2' : 'pt-1 pb-2') : 'py-2'}`}
      >
        <div className="px-5 sm:px-10 xl:px-12">
          {/* Search query header - mobile */}
          {query && isMobile && (
            <div className="mb-4 flex items-center space-x-2">
              <p className="text-sm text-neutral-700 sm:text-base">
                Search results for
              </p>
              <span className="font-medium text-black italic sm:text-lg">
                {query}
              </span>
            </div>
          )}

          {/* Subcategory label for mobile */}
          {isMobile && !query && (
            <p className="mt-2 font-semibold capitalize">
              {slug && Array.isArray(slug) && slug.length > 0
                ? getSubcat(slug)
                : 'All Products'}
            </p>
          )}

          <div className="flex w-full items-start justify-between">
            {/* Product list title for desktop */}
            {!isMobile && (
              <div className="flex flex-col">
                <p
                  className={`mt-1 font-medium capitalize transition-[font-size,line-height] duration-300 ease-in-out ${
                    productHeaderStuck
                      ? 'text-lg sm:text-xl'
                      : 'text-xl sm:text-2xl'
                  }`}
                >
                  {query
                    ? query
                    : slug && Array.isArray(slug) && slug.length > 0
                      ? getSubcat(slug)
                      : 'All Products'}
                  <span className="ml-2">{`(${totalCount})`}</span>
                </p>
              </div>
            )}

            <div
              className={`flex shrink-0 items-center gap-8 ${
                isMobile
                  ? query
                    ? '-mt-2 w-full justify-between'
                    : 'w-full justify-between'
                  : ''
              }`}
            >
              {/* Mobile: Results count */}
              {isMobile && (
                <span className="font-medium text-neutral-500 sm:text-lg">
                  {`${totalCount} Results`}
                </span>
              )}

              {/* Filter sidebar button */}
              {hasMounted && (
                <>
                  <button
                    type="button"
                    onClick={toggleSideBar}
                    disabled={loading}
                    className={`flex items-center font-medium transition-colors ${loading ? 'pointer-events-none opacity-50' : 'cursor-pointer opacity-100'} ${
                      isMobile
                        ? 'rounded-4xl border border-stone-300 px-4 py-1 hover:border-stone-600'
                        : 'w-fit pt-0.5'
                    } `}
                  >
                    {isMobile
                      ? 'Filter'
                      : showFilters
                        ? 'Hide Filters'
                        : 'Show Filters'}
                    <Image
                      src={SliderIcon}
                      alt="filter icon"
                      height={24}
                      className="mt-0.5 ml-2"
                    />
                  </button>

                  {/* Desktop: Sort button */}
                  {!isMobile && (
                    <SortProducts isSearchResults={!!query} loading={loading} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListHeader;
