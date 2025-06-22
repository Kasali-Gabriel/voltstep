'use client';

import { ChevronLeft, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

import { useSearch } from '@/hooks/useSearch';
import { useShadowOnScroll } from '@/hooks/useShadowOnscroll';
import { useSearchFocus } from '@/lib/state';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logoIcon.png';
import ProductCard from '../Product/ProductCard';
import ProductCardSkeleton from '../Skeletons/ProductCardSkeleton';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import PopularSearches from './PopularSearches';
import SearchHistory from './SearchHistory';

export const SearchView = () => {
  const [query, setQuery] = useState('');

  const {
    results,
    loading,
    popularSearches,
    recentViewed,
    recentSearches,
    recordViewedProduct,
  } = useSearch({ query });
  const { isScrolled, setIsScrolled, scrollRef } = useShadowOnScroll();
  const { isFocused, setIsFocused } = useSearchFocus();

  const [limit, setLimit] = useState(6);

  useEffect(() => {
    function updateLimit() {
      if (
        window.matchMedia('(min-width: 900px) and (orientation: landscape)')
          .matches
      ) {
        setLimit(5);
      } else {
        setLimit(6);
      }
    }

    updateLimit();

    window.addEventListener('resize', updateLimit);

    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  return (
    <Sheet
      open={isFocused}
      onOpenChange={(open) => {
        setIsFocused(open);
        if (!open) setQuery('');
      }}
    >
      <SheetTrigger>
        <Search className="h-6 w-6 cursor-pointer" strokeWidth={1.25} />
      </SheetTrigger>

      <SheetContent
        side="top"
        className="data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left overfloy-y-auto h-screen w-screen lg:h-screen"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <div className="relative flex h-full w-full flex-col py-2 ">
          <div
            className={`top-0 z-20 flex w-full items-center justify-between bg-white px-2 transition-shadow duration-75 sm:px-5 md:px-10 ${
              isScrolled ? 'pb-2 shadow-[0_10px_10px_-3px_rgba(0,0,0,0.3)]' : ''
            }`}
          >
            <Image
              src={logo}
              alt="logo"
              height={65}
              className="hidden lg:block"
            />

            <SheetClose tabIndex={-1} className="md:hidden">
              <ChevronLeft
                className="-ml-3 size-12 cursor-pointer"
                strokeWidth={1}
              />
            </SheetClose>

            <div className="relative mr-4 w-full md:mr-0 md:w-[85%] lg:w-[70%] xl:w-[60%]">
              <Search
                className="absolute top-1/2 left-3 size-6 -translate-y-1/2"
                strokeWidth={1}
              />

              <Input
                type="search"
                placeholder="What are you looking for today?"
                className="h-10 w-full rounded-xl border-2 bg-neutral-100 pl-12 placeholder:text-sm sm:placeholder:text-base md:rounded-3xl"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            <SheetClose
              tabIndex={-1}
              className="hidden cursor-pointer text-xl font-medium hover:text-neutral-500 md:block"
            >
              Cancel
            </SheetClose>
          </div>

          <div
            ref={scrollRef}
            className="scrollbar-thin max-h-screen flex-1 overflow-y-auto p-5 px-4 pt-10 md:px-10 md:pt-14"
            onScroll={(e) => {
              const scrollTop = e.currentTarget.scrollTop;
              setIsScrolled(scrollTop > 0);
            }}
          >
            {/* Empty query -> Popular searches */}
            {!loading && query.trim() === '' && (
              <div className="space-y-6 px-2 md:-ml-4 md:px-0 lg:px-[2rem] xl:px-[4rem]">
                <PopularSearches
                  popularSearches={popularSearches}
                  setQuery={setQuery}
                />

                <SearchHistory
                  recentSearches={recentSearches}
                  recentViewed={recentViewed}
                  setQuery={setQuery}
                  recordViewedProduct={recordViewedProduct}
                  loading={loading}
                />
              </div>
            )}

            {/* No results */}
            {!loading && query.trim() !== '' && results.length === 0 && (
              <div className="col-span-full flex w-full flex-col gap-6 lg:px-[10rem] xl:px-[16rem]">
                <p className="text-muted-foreground text-sm: md:text-base">
                  No results found for{' '}
                  <span className="font-medium text-black italic md:text-lg">
                    {query}
                  </span>
                  . Try a different keyword.
                </p>

                <PopularSearches
                  popularSearches={popularSearches}
                  setQuery={setQuery}
                  text="TRENDING SEARCHES"
                />

                <SearchHistory
                  recentSearches={recentSearches}
                  recentViewed={recentViewed}
                  setQuery={setQuery}
                  recordViewedProduct={recordViewedProduct}
                  loading={loading}
                />
              </div>
            )}

            {/* results */}
            <div className="grid grid-cols-2 gap-4 gap-y-10 md:grid-cols-3 [@media(min-width:900px)_and_(orientation:landscape)]:grid-cols-5">
              {/* Loading skeleton */}
              {loading && (
                <>
                  {Array.from({ length: limit }).map((_, i) => (
                    <div key={i}>
                      <ProductCardSkeleton />
                    </div>
                  ))}
                </>
              )}

              {/* Results found */}
              {!loading && query.trim() !== '' && results.length > 0 && (
                <>
                  {results.slice(0, limit).map((product) => (
                    <div key={product.id}>
                      <ProductCard
                        loading={false}
                        SearchedProduct={product}
                        query={!!query}
                        setQuery={setQuery}
                        recordViewedProduct={recordViewedProduct}
                      />
                    </div>
                  ))}

                  {/* View all if more results than limit */}
                  {results.length > limit && (
                    <div className="col-span-full mt-4 flex justify-end">
                      <Link
                        href={`/products?q=${query.replace(/ /g, '%20')}`}
                        className="text-neutral-600"
                        onClick={() => setIsFocused(false)}
                      >
                        View all &quot;
                        <span className="font-semibold text-black underline underline-offset-2">
                          {query}
                        </span>
                        &quot;
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchView;
