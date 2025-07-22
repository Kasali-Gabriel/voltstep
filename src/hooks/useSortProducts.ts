import { SearchedProduct } from '@/types/search';
import { create } from 'zustand';

const options = [
  { value: 'relevance' as const, label: 'Relevance' },
  { value: 'popular' as const, label: 'Most Popular' },
  { value: 'price-low-high' as const, label: 'Price: Low to High' },
  { value: 'price-high-low' as const, label: 'Price: High to Low' },
  { value: 'newest' as const, label: 'Newest' },
];

type SortOption =
  | 'relevance'
  | 'price-low-high'
  | 'price-high-low'
  | 'newest'
  | 'popular';

export type SortState = {
  sortBy: SortOption | null;
  setSortBy: (sortBy: SortOption) => void;
  getSortBy: (isSearch: boolean) => SortOption;
  getOptions: (isSearch: boolean) => typeof options;
  sortProducts: (
    products: SearchedProduct[],
    isSearch: boolean,
  ) => SearchedProduct[];
};

const useSortStore = create<SortState>((set, get) => ({
  sortBy: null, // Start with no explicit sort preference

  setSortBy: (sortBy: SortOption) => set({ sortBy }),

  getSortBy: (isSearch: boolean) => {
    const current = get().sortBy;

    // If no explicit sort has been set, use context-appropriate defaults
    if (current === null) {
      return isSearch ? 'relevance' : 'popular';
    }

    const validOptions = isSearch
      ? options
      : options.filter((o) => o.value !== 'relevance');

    // If current sort is valid for the context, use it
    if (validOptions.some((o) => o.value === current)) {
      return current;
    }

    // Otherwise, fallback to context-appropriate default
    return isSearch ? 'relevance' : 'popular';
  },

  getOptions: (isSearch: boolean) =>
    isSearch ? options : options.filter((o) => o.value !== 'relevance'),

  sortProducts: (products: SearchedProduct[], isSearch: boolean) => {
    const sortBy = get().getSortBy(isSearch);
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
        return isSearch
          ? sorted
          : sorted.sort((a, b) => b.popularity - a.popularity);
    }
  },
}));

export const useSortProducts = (isSearchResults?: boolean) => {
  const store = useSortStore();
  return {
    setSortBy: store.setSortBy,
    getSortBy: () => store.getSortBy(isSearchResults ?? false),
    getOptions: () => store.getOptions(isSearchResults ?? false),
    currentSort: store.getSortBy(isSearchResults ?? false),
  };
};
