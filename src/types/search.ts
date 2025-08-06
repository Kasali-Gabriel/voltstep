import { ProductFilters } from '@/utils/Product/productFilters';

export interface SearchHistoryItem {
  id: string;
  query: string;
  searchedAt: string;
}

export interface PopularSearchItem {
  id: string;
  query: string;
  count: number;
  lastSearched: string;
}

export interface SuggestionItem {
  id: string;
  query: string;
}

export interface PopularSearchesProps {
  popularSearches: PopularSearchItem[];
  setQuery: (query: string) => void;
  text?: string;
}

export interface SearchHistoryProps {
  recentSearches: SearchHistoryItem[];
  recentViewed: SearchedProduct[];
  setQuery?: (query: string) => void;
  loading: boolean;
}

// For search results, variants are flattened for easier consumption
export type ProductSizeVariant = {
  id: string;
  size: string;
  quantity: number;
};

export type ProductColor = {
  id: string;
  color: string;
  variants: ProductSizeVariant[];
};

export type SearchedProduct = {
  id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  description: string;
  subcategory: string;
  category: string;
  catalog: string;
  catSubcat?: string;
  avgRating?: number | null;
  variants: { color: string; size: string; quantity: number }[];
  colors: string[];
  dateAdded: Date | string;
  availableColors: number | string;
  popularity: number;
  tags: string[];
  quantity?: number;
};

export interface SearchParams {
  userId?: string;
  slug?: string[];
  query: string;
  sort?: string;
  filters?: ProductFilters;
  initialResults?: SearchedProduct[];
  initialUnfilteredResults?: SearchedProduct[];
  initialTotalCount?: number;
  initialHasMore?: boolean;
  skipInitialFetch?: boolean;
}
