import { Product } from './product';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  selectedColor: string;
  slug: string;
  product: Product;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  clearCart: () => void;
  getSubTotal: () => number;
  getShippingFee: () => number;
  getTaxFee: () => number;
  getTotal: () => number;
}

export interface AddToBagButtonProps {
  onClick?: () => void;
  className?: string;
}
