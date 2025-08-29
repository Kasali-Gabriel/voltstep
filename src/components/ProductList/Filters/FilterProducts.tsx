'use client';

import { SearchedProduct } from '@/types/search';
import {
  filtersToURLParams,
  parseFiltersFromURL,
} from '@/utils/Product/productFilters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AvailabilityFilter } from './AvailabilityFilter';
import { ColorFilter, getTopColors } from './ColorFilter';
import { getSmartPriceRanges, PriceFilter } from './PriceFilter';
import { RatingFilter } from './RatingFilter';
import { getSmartSizes, SizeFilter } from './SizeFilter';
import { TagsFilter } from './TagsFilter';
import { ProductFilters } from '@/types/product';

export const FilterProducts = ({
  products = [],
  slug,
  loading = false,
}: {
  products?: SearchedProduct[];
  slug?: string[];
  loading?: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const priceRanges = useMemo(() => getSmartPriceRanges(products), [products]);
  const availableSizes = useMemo(
    () => getSmartSizes(slug, products.length > 0 ? products : undefined),
    [slug, products],
  );
  const topColors = useMemo(() => getTopColors(products), [products]);

  const [filters, setFilters] = useState<ProductFilters>(() => {
    // Initialize filters from URL parameters
    const urlFilters = parseFiltersFromURL(searchParams);
    return {
      // Only set priceRange if there are actual URL parameters for it
      priceRange: urlFilters.priceRange,
      priceRanges: urlFilters.priceRanges || [],
      sizes: urlFilters.sizes || [],
      colors: urlFilters.colors || [],
      tags: urlFilters.tags || [],
      rating: urlFilters.rating || 0,
      inStock: urlFilters.inStock || false,
    };
  });

  const [openSections, setOpenSections] = useState({
    price: true,
    size: true,
    color: true,
    tags: true,
    rating: true,
    availability: true,
  });

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    // Update URL params using utility
    const params = filtersToURLParams(updated);

    // Preserve any existing query parameters
    const currentParams = new URLSearchParams(searchParams);
    const query = currentParams.get('q');
    if (query) {
      params.set('q', query);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const clearedFilters: ProductFilters = {
      priceRange: undefined,
      priceRanges: [],
      sizes: [],
      colors: [],
      tags: [],
      rating: 0,
      inStock: false,
    };
    updateFilters(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      (filters.priceRanges && filters.priceRanges.length > 0) ||
      (filters.sizes && filters.sizes.length > 0) ||
      (filters.colors && filters.colors.length > 0) ||
      (filters.tags && filters.tags.length > 0) ||
      (filters.rating && filters.rating > 0) ||
      filters.inStock
    );
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Track if this is the initial mount load
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    if (!loading && initialLoading) {
      setInitialLoading(false);
    }
    // Only set to false after first load
  }, [loading, initialLoading]);

  return (
    <div
      className={`h-full ${initialLoading ? 'pointer-events-none opacity-50' : ''}`}
    >
      {hasActiveFilters() && (
        <div className="flex items-center justify-end">
          <button
            onClick={clearAllFilters}
            className="cursor-pointer rounded-3xl border border-red-300 px-4 py-1 font-medium text-red-400 hover:border-red-600 hover:text-red-600"
          >
            Clear filters
          </button>
        </div>
      )}

      <AvailabilityFilter
        filters={filters}
        updateFilters={updateFilters}
        open={openSections.availability}
        toggleSection={() => toggleSection('availability')}
      />

      <PriceFilter
        filters={filters}
        updateFilters={updateFilters}
        open={openSections.price}
        toggleSection={() => toggleSection('price')}
        priceRanges={priceRanges}
      />

      <SizeFilter
        availableSizes={availableSizes}
        filters={filters}
        updateFilters={updateFilters}
        open={openSections.size}
        toggleSection={() => toggleSection('size')}
      />

      <ColorFilter
        topColors={topColors}
        filters={filters}
        updateFilters={updateFilters}
        open={openSections.color}
        toggleSection={() => toggleSection('color')}
      />

      <RatingFilter
        filters={filters}
        updateFilters={updateFilters}
        open={openSections.rating}
        toggleSection={() => toggleSection('rating')}
      />

      <TagsFilter
        filters={filters}
        updateFilters={updateFilters}
        open={openSections.tags}
        toggleSection={() => toggleSection('tags')}
      />
    </div>
  );
};
