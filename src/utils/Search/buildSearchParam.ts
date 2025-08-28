import { ProductFilters } from "@/types/product";


export function buildSearchParams(
  query: string,
  limit: number,
  offset: number,
  sort: string | undefined,
  filters: ProductFilters = {},
): Record<string, unknown> {
  const params: Record<string, unknown> = {
    q: query,
    limit,
    offset,
    sort,
  };
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
  return params;
}
