import { SearchHistoryItem, ViewedProductItem } from '@/types/search';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmailState {
  email: string;
  setEmail: (value: string) => void;
}

interface BagState {
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
}

interface SearchState {
  isFocused: boolean;
  setIsFocused: (open: boolean) => void;
}

interface SuccessDialogState {
  showSuccessDialog: boolean;
  setShowSuccessDialog: (open: boolean) => void;
}

interface ViewedProductStore {
  viewedProducts: ViewedProductItem[];
  addViewedProduct: (item: ViewedProductItem) => void;
}

interface SearchHistoryStore {
  searchHistory: SearchHistoryItem[];
  addSearchHistory: (item: SearchHistoryItem) => void;
}

export interface showFilterState {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}

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

export const useBagStore = create<BagState>()((set) => ({
  isBagOpen: false,
  setIsBagOpen: (open: boolean) => set({ isBagOpen: open }),
}));

export const useSearchFocus = create<SearchState>()((set) => ({
  isFocused: false,
  setIsFocused: (open: boolean) => set({ isFocused: open }),
}));

export const useWishlistSuccessDialogStore = create<SuccessDialogState>()(
  (set) => ({
    showSuccessDialog: false,
    setShowSuccessDialog: (open: boolean) => set({ showSuccessDialog: open }),
  }),
);

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    (set, get) => ({
      searchHistory: [],
      addSearchHistory: (item) => {
        // Prevent duplicates, keep most recent at the top, max 10
        set({
          searchHistory: [
            item,
            ...get().searchHistory.filter((i) => i.query !== item.query),
          ].slice(0, 10),
        });
      },
    }),
    { name: 'searchHistoryStore' },
  ),
);

export const useViewedProductStore = create<ViewedProductStore>()(
  persist(
    (set, get) => ({
      viewedProducts: [],

      addViewedProduct: (item) => {
        set({
          viewedProducts: [
            item,
            ...get().viewedProducts.filter(
              (i) => i.product.slug !== item.product.slug,
            ),
          ].slice(0, 10),
        });
      },
    }),
    { name: 'viewedProductStore' },
  ),
);

export const useSideBarStore = create<showFilterState>()(
  persist(
    (set) => ({
      showFilters: false,
      setShowFilters: (showFilters: boolean) => set({ showFilters }),
    }),

    {
      name: 'sidebarStorage',
    },
  ),
);
