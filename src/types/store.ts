import { SearchHistoryItem, ViewedProductItem } from './search';

export interface EmailState {
  email: string;
  setEmail: (value: string) => void;
}

export interface BagState {
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
}

export interface SearchState {
  isFocused: boolean;
  setIsFocused: (open: boolean) => void;
}

export interface SuccessDialogState {
  showSuccessDialog: boolean;
  setShowSuccessDialog: (open: boolean) => void;
}

export interface ViewedProductStore {
  viewedProducts: ViewedProductItem[];
  addViewedProduct: (item: ViewedProductItem) => void;
}

export interface SearchHistoryStore {
  searchHistory: SearchHistoryItem[];
  addSearchHistory: (item: SearchHistoryItem) => void;
}

export interface showFilterState {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}

export interface NavBarState {
  navbarHeight: number;
  setNavbarHeight: (height: number) => void;
  showNavBar: boolean;
  setShowNavBar: (value: boolean) => void;
  isFixed: boolean;
  setIsFixed: (value: boolean) => void;
}

export interface ProductHeaderState {
  productHeaderHeight: number;
  setProductHeaderHeight: (height: number) => void;
  productHeaderStuck: boolean;
  setProductHeaderStuck: (value: boolean) => void;
}
