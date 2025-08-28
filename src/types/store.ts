import { CreateDeliveryAddressInput } from './address';
import { OrderItem } from './order';
import { ViewedProductItem } from './product';
import { SearchHistoryItem } from './search';

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

export interface AddressState {
  isFormValid: boolean;
  setIsFormValid: (val: boolean) => void;
}

export interface OrderState {
  orderId: string | null;
  clientSecret: string | null;
  creatingOrder: boolean;
  isGuest: boolean;

  setOrderId: (id: string | null) => void;
  setClientSecret: (secret: string | null) => void;
  setCreatingOrder: (val: boolean) => void;
  setIsGuest: (val: boolean) => void;
  resetOrder: () => void;

  createOrFetchOrder: (params: {
    items: OrderItem[];
    deliveryAddress?: {
      deliveryAddressId?: string | null;
      guestDeliveryAddress?: CreateDeliveryAddressInput;
    };
    userId?: string | null;
    totalAmount?: number;
    shippingCost?: number;
    taxAmount?: number;
  }) => Promise<void>;
}

