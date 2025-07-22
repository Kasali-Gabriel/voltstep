import type { SearchedProduct, SearchHistoryItem } from '@/types/search';

export function getGuestRecentSearches(
  guestSearchHistory: SearchHistoryItem[],
): SearchHistoryItem[] {
  return guestSearchHistory;
}

export function getGuestRecentViewed(
  guestViewedProducts: { product: SearchedProduct }[],
): SearchedProduct[] {
  return guestViewedProducts.map((item) => item.product);
}

export function addGuestSearchHistory(
  addGuestSearchHistory: (item: SearchHistoryItem) => void,
  query: string,
) {
  addGuestSearchHistory({
    id: Date.now().toString(),
    query,
    searchedAt: new Date().toISOString(),
  });
}

export function addGuestViewedProduct(
  addGuestViewedProduct: (item: {
    id: string;
    viewedAt: string;
    product: SearchedProduct;
  }) => void,
  product: SearchedProduct,
) {
  addGuestViewedProduct({
    id: Date.now().toString(),
    viewedAt: new Date().toISOString(),
    product,
  });
}
