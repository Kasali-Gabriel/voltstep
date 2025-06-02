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

export interface AddToBagButtonProps {
  onClick?: () => void;
  className?: string;
}
