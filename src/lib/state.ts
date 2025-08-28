import {
  AddressState,
  BagState,
  EmailState,
  NavBarState,
  ProductHeaderState,
  SearchHistoryStore,
  SearchState,
  showFilterState,
  SuccessDialogState,
  ViewedProductStore,
} from '@/types/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNavBarStore = create<NavBarState>()((set) => ({
  navbarHeight: 0,
  setNavbarHeight: (height: number) => set({ navbarHeight: height }),
  showNavBar: true,
  setShowNavBar: (value: boolean) => set(() => ({ showNavBar: value })),
  isFixed: false,
  setIsFixed: (value: boolean) => set(() => ({ isFixed: value })),
}));

export const useProductHeaderStore = create<ProductHeaderState>()((set) => ({
  productHeaderHeight: 0,
  setProductHeaderHeight: (height: number) =>
    set({ productHeaderHeight: height }),
  productHeaderStuck: false,
  setProductHeaderStuck: (value: boolean) =>
    set(() => ({ productHeaderStuck: value })),
}));

export const useEmailStore = create<EmailState>()(
  persist(
    (set) => ({
      email: '',
      setEmail: (newEmail: string) => set(() => ({ email: newEmail })),
    }),
    {
      name: 'emailStorage',
      partialize: (state) => ({ email: state.email }),
    },
  ),
);

export const useBagStore = create<BagState>()((set) => ({
  isBagOpen: false,
  setIsBagOpen: (open: boolean) => set(() => ({ isBagOpen: open })),
}));

export const useSearchFocus = create<SearchState>()((set) => ({
  isFocused: false,
  setIsFocused: (open: boolean) => set(() => ({ isFocused: open })),
}));

export const useWishlistSuccessDialogStore = create<SuccessDialogState>()(
  (set) => ({
    showSuccessDialog: false,
    setShowSuccessDialog: (open: boolean) =>
      set(() => ({ showSuccessDialog: open })),
  }),
);

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    (set) => ({
      searchHistory: [],
      addSearchHistory: (item) =>
        set((state) => ({
          searchHistory: [
            item,
            ...state.searchHistory.filter((i) => i.query !== item.query),
          ].slice(0, 10),
        })),
    }),
    {
      name: 'searchHistoryStore',
      partialize: (state) => ({ searchHistory: state.searchHistory }),
    },
  ),
);

export const useViewedProductStore = create<ViewedProductStore>()(
  persist(
    (set) => ({
      viewedProducts: [],
      addViewedProduct: (item) =>
        set((state) => ({
          viewedProducts: [
            item,
            ...state.viewedProducts.filter(
              (i) => i.product.slug !== item.product.slug,
            ),
          ].slice(0, 10),
        })),
    }),
    {
      name: 'viewedProductStore',
      partialize: (state) => ({ viewedProducts: state.viewedProducts }),
    },
  ),
);

export const useSideBarStore = create<showFilterState>()(
  persist(
    (set) => ({
      showFilters: true,
      setShowFilters: (showFilters: boolean) => set(() => ({ showFilters })),
    }),
    {
      name: 'sidebarStorage',
      partialize: (state) => ({ showFilters: state.showFilters }),
    },
  ),
);

export const useAddressStore = create<AddressState>((set) => ({
  isFormValid: false,
  setIsFormValid: (val: boolean) => set({ isFormValid: val }),
}));
