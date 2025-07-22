import { Tag } from '@/types/product';

export interface ProductFilters {
  priceRange?: [number, number];
  priceRanges?: Array<[number, number]>; // Multiple price ranges
  sizes?: string[];
  colors?: string[];
  tags?: Tag[];
  rating?: number;
  inStock?: boolean;
  subcategory?: string;
  category?: string;
  catalog?: string;
}

/**
 * Parse URL search parameters into filter object
 */
export function parseFiltersFromURL(
  searchParams: URLSearchParams,
): ProductFilters {
  const filters: ProductFilters = {};

  // Price range (legacy single range)
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice && maxPrice) {
    filters.priceRange = [parseInt(minPrice), parseInt(maxPrice)];
  }

  // Multiple price ranges (new format)
  const priceRangesParam = searchParams.get('priceRanges');
  if (priceRangesParam) {
    try {
      // Format: "min1-max1,min2-max2,min3-max3"
      filters.priceRanges = priceRangesParam.split(',').map((range) => {
        const [min, max] = range.split('-').map(Number);
        return [min, max] as [number, number];
      });
    } catch (error) {
      console.error('Error parsing price ranges from URL:', error);
    }
  }

  // Sizes
  const sizes = searchParams.get('sizes');
  if (sizes) {
    filters.sizes = sizes.split(',');
  }

  // Colors
  const colors = searchParams.get('colors');
  if (colors) {
    filters.colors = colors.split(',');
  }

  // Tags
  const tags = searchParams.get('tags');
  if (tags) {
    filters.tags = tags.split(',') as Tag[];
  }

  // Rating
  const rating = searchParams.get('rating');
  if (rating) {
    filters.rating = parseInt(rating);
  }

  // In stock
  const inStock = searchParams.get('inStock');
  if (inStock === 'true') {
    filters.inStock = true;
  }

  return filters;
}

/**
 * Convert filter object to URL search parameters
 */
export function filtersToURLParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();

  // Use multiple price ranges if available, otherwise fall back to single range
  if (filters.priceRanges && filters.priceRanges.length > 0) {
    // Format: "min1-max1,min2-max2,min3-max3"
    const rangesString = filters.priceRanges
      .map(([min, max]) => `${min}-${max}`)
      .join(',');
    params.set('priceRanges', rangesString);
  }

  if (filters.sizes && filters.sizes.length > 0) {
    params.set('sizes', filters.sizes.join(','));
  }

  if (filters.colors && filters.colors.length > 0) {
    params.set('colors', filters.colors.join(','));
  }

  if (filters.tags && filters.tags.length > 0) {
    params.set('tags', filters.tags.join(','));
  }

  if (filters.rating && filters.rating > 0) {
    params.set('rating', filters.rating.toString());
  }

  if (filters.inStock) {
    params.set('inStock', 'true');
  }

  return params;
}
