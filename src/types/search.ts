export interface SearchHistoryItem {
  id: string;
  query: string;
  searchedAt: string;
}

export interface ViewedProductItem {
  id: string;
  viewedAt: string;
  product: SearchedProduct;
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
  recordViewedProduct: (product: SearchedProduct) => void;
  loading: boolean;
}

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
  availableColors?: number | string;
};
