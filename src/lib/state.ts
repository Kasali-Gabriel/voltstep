import { EmailState, ProductState } from '@/types';
import { ProductsData } from '@/types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchProductData } from './utils';

export const useEmailStore = create<EmailState>()(
  persist(
    (set) => ({
      email: '',
      setEmail: (newEmail: string) => set({ email: newEmail }),
    }),
    {
      name: 'emailStorage',
    },
  ),
);

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      productData: [] as ProductsData[],
      setProductData: (data: ProductsData[]) => set({ productData: data }),
      fetchProductDataIfNeeded: async () => {
        if (get().productData.length === 0) {
          const data = await fetchProductData();
          set({ productData: data });
        }
      },
    }),
    {
      name: 'productStorage',
    },
  ),
);
