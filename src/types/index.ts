import { ProductsData } from './product';

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

export interface EmailState {
  email: string;
  setEmail: (value: string) => void;
}

export interface ProductState {
  productData: ProductsData[];
  setProductData: (data: ProductsData[]) => void;
  fetchProductDataIfNeeded: () => Promise<void>;
}
