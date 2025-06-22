'use client';

import SliderIcon from '@/assets/sliders-simple-svgrepo-com.svg';
import Filters from '@/components/Product/Filters';
import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Skeletons/ProductCardSkeleton';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useSearch } from '@/hooks/useSearch';
import { useSideBarStore } from '@/lib/state';
import { Product, ProductListProps } from '@/types/product';
import { SearchedProduct } from '@/types/search';
import Image from 'next/image';
import { Suspense, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Helper to map Product to SearchedProduct shape
const mapProductToSearchedProduct = (product: Product): SearchedProduct => ({
  id: product.id,
  name: product.name,
  image: product.images[0] || '/placeholder.png',
  slug: product.slug,
  price: product.price,
  description: product.description,
  subcategory: product.subcategory?.name || '',
  category: product.subcategory?.category?.name || '',
  catalog: product.subcategory?.category?.catalog?.name || '',
  avgRating:
    product.reviews && product.reviews.length > 0
      ? Number(
          (
            product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
            product.reviews.length
          ).toFixed(1),
        )
      : null,
  availableColors:
    Array.isArray(product.colors) && product.colors.length === 1
      ? product.colors[0]
      : product.colors?.length || 0,
});

const ProductsList = ({
  query,
  products = [],
  slug,
  loading: isLoading,
}: ProductListProps & {}) => {
  const [isMobile] = useIsMobile(900);

  const { showFilters, setShowFilters } = useSideBarStore();
  const toggleSideBar = () => setShowFilters(!showFilters);

  const search = useSearch({ query: query ?? '' });

  let displayProducts: SearchedProduct[] = [];
  const loading = isLoading || search.loading;

  if (products && products.length > 0) {
    // Map Product[] to SearchedProduct[]
    displayProducts = products.map(mapProductToSearchedProduct);
  } else if (query) {
    displayProducts = search.results;
  }

  // Helper to build the subCat string from slug and displayProducts
  const getSubcat = () => {
    if (!slug || slug.length === 0 || displayProducts.length === 0) return '';

    const firstProduct = displayProducts[0];

    let catalogName = slug[0]?.charAt(0).toUpperCase() + slug[0]?.slice(1);

    if (slug[0] === 'men') catalogName = "Men's";
    if (slug[0] === 'women') catalogName = "Women's";
    if (slug[0] === 'kids') catalogName = "Kids'";

    if (slug.length === 1) {
      return `Shop ${catalogName}`;
    } else if (slug.length === 2) {
      // catalog + category
      return `${catalogName} ${firstProduct.category}`;
    } else if (slug.length === 3) {
      // catalog + subcategory
      return `${catalogName} ${firstProduct.subcategory}`;
    }
    return '';
  };

  useEffect(() => {
    if (isMobile) {
      setShowFilters(false);
    }
  }, [isMobile, setShowFilters]);

  return (
    <div className="mt-2 flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col px-5 sm:px-10 xl:px-12">
        {query && (
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-medium text-neutral-700 sm:text-base">
              Search results for
            </h1>

            {isMobile && <p className="font-semibold italic">{query}</p>}
          </div>
        )}

        {isMobile && <p className="mt-2 font-semibold"> {getSubcat()}</p>}

        <div className="flex w-full items-start justify-between">
          {/* Left section */}
          {!isMobile && (
            <div className="flex flex-col">
              <p className="mt-1 text-xl font-medium sm:text-2xl">
                {query ? query : slug ? getSubcat() : 'All Products'}
                <span className="ml-2 text-2xl">{`(${displayProducts.length})`}</span>
              </p>
            </div>
          )}

          {/* Right section */}
          <div
            className={`flex shrink-0 items-center space-x-8 ${
              isMobile ? 'w-full justify-between' : ''
            }`}
          >
            {isMobile && (
              <p className="font-medium text-neutral-500 sm:text-lg">
                {`${displayProducts.length} Results`}
              </p>
            )}

            <button
              onClick={toggleSideBar}
              className={`flex cursor-pointer items-center font-medium whitespace-nowrap ${!query ? 'mt-2' : ''} ${
                isMobile ? '' : 'w-fit'
              }`}
            >
              {isMobile
                ? 'Filter & Sort'
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

            {!isMobile && (
              <Select>
                <SelectTrigger
                  className="w-auto cursor-pointer border-transparent p-0 pt-0.5 text-base font-medium shadow-none hover:shadow-none focus-visible:border-0 focus-visible:ring-0 data-[placeholder]:text-black data-[size=default]:h-auto data-[size=sm]:h-auto"
                  iconClassName="size-6 text-black mt-1"
                >
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>

                <SelectContent
                  align="end"
                  className="rounded-none rounded-bl-3xl border pt-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
                >
                  <SelectItem
                    value="light"
                    className="cursor-pointer justify-end pr-3 text-base font-medium text-black focus:bg-transparent focus:text-neutral-500"
                  >
                    Light
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full">
        <Suspense>
          <Filters />
        </Suspense>

        <div
          className={`grid w-full grid-cols-2 gap-x-5 gap-y-10 px-5 sm:px-10 md:gap-y-16 lg:grid-cols-3 xl:px-12 ${!isMobile && showFilters ? 'ml-72' : ''} transition-all duration-300`}
        >
          {loading && displayProducts.length === 0 ? (
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i}>
                <ProductCardSkeleton />
              </div>
            ))
          ) : displayProducts.length > 0 ? (
            displayProducts.map((product: SearchedProduct) => (
              <ProductCard
                key={product.id}
                SearchedProduct={product}
                loading={loading}
                isPage
                query={!!query}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-neutral-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
