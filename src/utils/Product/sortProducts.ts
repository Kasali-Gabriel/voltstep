import { SearchedProduct } from '@/types/search';

export type SortOption =
  | 'relevance'
  | 'price-low-high'
  | 'price-high-low'
  | 'newest'
  | 'popular';

export function sortProducts(
  products: SearchedProduct[],
  sortBy: SortOption,
  isSearchResults = false,
): SearchedProduct[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
      );
    case 'popular':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    case 'relevance':
    default:
      return isSearchResults
        ? sorted
        : sorted.sort((a, b) => b.popularity - a.popularity);
  }
}
