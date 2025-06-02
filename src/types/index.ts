export interface AuthHeaderProps {
  title: string;
  description?: string;
  isSemibold?: boolean;
}

export interface AuthContinueBtnProps {
  BtnText?: string;
  isSignUp?: boolean;
  isGlobalLoading?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

export interface AuthOptionProps {
  text: string;
  btnText: string;
  href: string;
}

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  sizeError?: boolean;
  setSizeError?: (error: boolean) => void;
  isTitle?: boolean;
}

export interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
}

export interface ReviewFiltersProps {
  rating: string;
  setRating: (r: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
  sortOrder: string;
  setSortOrder: (s: string) => void;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedSize?: string;
  selectedColor?: string;
  slug: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  getSubTotal: () => string;
  getShippingFee: () => number;
  getTotal: () => string;
}

export interface SignedOutProp {
  title: string;
  description: string;
  isSheet?: boolean;
}
