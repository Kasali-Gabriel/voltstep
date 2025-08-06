import { useUserId } from '@/context/UserContext';
import { useViewedProductStore } from '@/lib/state';
import { SearchedProduct } from '@/types/search';
import axios from 'axios';
import { useCallback } from 'react';

export function useViewedProduct() {
  const userId = useUserId();
  const addGuestViewedProduct = useViewedProductStore(
    (s) => s.addViewedProduct,
  );

  // Fetch recent viewed products
  const fetchRecentViewed = useCallback(
    async (
      guestViewedProducts: { product: SearchedProduct }[],
      fromSearch?: boolean,
    ): Promise<SearchedProduct[]> => {
      if (!userId) {
        return guestViewedProducts.map((item) => item.product);
      }
      try {
        const res = await axios.get('/api/product/viewedproduct', {
          params: { userId, fromSearch },
        });

        return res.data || [];
      } catch {
        return [];
      }
    },
    [userId],
  );

  // Record a viewed product
  const recordViewedProduct = useCallback(
    async (fromSearch: boolean, query: string, product: SearchedProduct) => {
      if (userId && product?.id) {
        await axios.post('/api/product/viewedproduct', {
          userId,
          SearchedProduct: product,
          fromSearch,
          query,
        });
      } else if (!userId && product?.slug) {
        addGuestViewedProduct({
          id: Date.now().toString(),
          viewedAt: new Date().toISOString(),
          fromSearch,
          query,
          product,
        });
      }
    },
    [userId, addGuestViewedProduct],
  );

  return {
    fetchRecentViewed,
    recordViewedProduct,
  };
}
