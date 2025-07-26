'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import {
  useNavBarStore,
  useProductHeaderStore,
  useSideBarStore,
} from '@/lib/state';
import { ProductFilterProps } from '@/types/product';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import SortProducts from '../ProductList/SortProducts';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { FilterProducts } from './FilterProducts';

const Filters = ({
  atProductListEnd,
  filterBottomOffset = 0,
  isSearchResults = false,
  slug,
  unfilteredResults,
}: ProductFilterProps) => {
  const { showFilters, setShowFilters } = useSideBarStore();
  const { navbarHeight, showNavBar, isFixed } = useNavBarStore();
  const { productHeaderHeight, productHeaderStuck } = useProductHeaderStore();

  const [isMobile] = useIsMobile(1024);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [headerOffset, setHeaderOffset] = useState(0);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterTopOffset, setFilterTopOffset] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastOffsetRef = useRef(0);

  const calculateOffset = useCallback(() => {
    const navOffset = isFixed && showNavBar ? navbarHeight : 0;

    setHeaderOffset(navOffset + productHeaderHeight);
  }, [isFixed, navbarHeight, showNavBar, productHeaderHeight]);

  useEffect(() => {
    calculateOffset();
  });

  const updateFilterOffset = useCallback(() => {
    if ((!productHeaderStuck || atProductListEnd) && filterRef.current) {
      const rect = filterRef.current.getBoundingClientRect();
      const newOffset = Math.max(0, rect.top);

      // Only update if the change is significant (more than 10px) and different from last recorded
      if (Math.abs(newOffset - lastOffsetRef.current) > 10) {
        lastOffsetRef.current = newOffset;
        setFilterTopOffset(newOffset);
      }
    }
  }, [productHeaderStuck, atProductListEnd]);

  useEffect(() => {
    if (hasMounted) {
      updateFilterOffset();
    }
  }, [hasMounted, updateFilterOffset]);

  const throttledUpdateFilterOffset = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(updateFilterOffset);
  }, [updateFilterOffset]);

  useEffect(() => {
    // Add optimized scroll listener when product header is not stuck OR when at product list end
    if (!productHeaderStuck || atProductListEnd) {
      window.addEventListener('scroll', throttledUpdateFilterOffset, {
        passive: true,
      });
      window.addEventListener('resize', throttledUpdateFilterOffset, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('scroll', throttledUpdateFilterOffset);
        window.removeEventListener('resize', throttledUpdateFilterOffset);
      };
    }
  }, [productHeaderStuck, atProductListEnd, throttledUpdateFilterOffset]);

  return (
    <>
      {hasMounted &&
        (isMobile ? (
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetContent
              className="flex h-screen flex-col p-5 sm:p-8"
              side="bottom"
            >
              <VisuallyHidden>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
              </VisuallyHidden>

              <div className="relative mt-2 flex justify-between">
                <h2 className="text-lg font-medium"> Filters</h2>

                <SheetClose className="-mt-2 rounded-full bg-neutral-200 p-2">
                  <X
                    className="size-6 cursor-pointer"
                    size={15}
                    strokeWidth={2}
                  />
                </SheetClose>
              </div>

              <div className="scrollbar-thin flex flex-col overflow-y-auto pr-3 sm:pr-5">
                <SortProducts
                  isMobile
                  isSearchResults={isSearchResults}
                />

                <FilterProducts
                  products={unfilteredResults}
                  slug={slug}
                />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <aside className="relative flex">
            <div
              ref={filterRef}
              style={{
                position: 'sticky',
                top: headerOffset,
                height: productHeaderStuck
                  ? `calc(100vh - ${headerOffset}px - ${filterBottomOffset}px)`
                  : `calc(100vh - ${filterTopOffset}px)`,
                bottom: atProductListEnd ? filterBottomOffset : undefined,
              }}
              className={`scrollbar-thin w-[17rem] overflow-y-auto bg-white pr-5 pl-10 transition-transform duration-300 xl:pl-12 ${
                showFilters ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <FilterProducts
                products={unfilteredResults}
                slug={slug}
              />
            </div>
          </aside>
        ))}
    </>
  );
};

export default Filters;
