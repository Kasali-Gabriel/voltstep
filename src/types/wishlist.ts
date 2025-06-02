import { Product } from './product';

export interface WishListItem {
  productId: string;
  selectedSize?: string;
  selectedColor?: string;
  createdAt?: Date;
  product?: Product;
}

export interface AddToWishListProps {
  productName: string;
  productImage?: string;
  productPrice?: number;
  productId: string;
  selectedSize?: string;
  selectedColor?: string;
  setActiveTab?: (tab: "wishlist" | "bag") => void;
}

export interface UseWishlistItemProps {
  productId?: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishListItemCardProps {
  item: WishListItem;
  isPage?: boolean;
}

export interface AddToBagButtonProps {
  onClick?: () => void;
  className?: string;
}

export interface RemoveFromWishlistButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export interface ViewWishlistProps {
  setSheetOpen?: (open: boolean) => void;
  isNavBar?: boolean;
}

export interface WishListSizeSelectorProps {
  isPage: boolean;
  showSizeDialog?: boolean;
  setShowSizeDialog?: (open: boolean) => void;
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  sizeError: boolean;
  setSizeError: (err: boolean) => void;
  item: WishListItem;
  handleAddToBag: () => void;
  handleProductLinkClick: () => void;
}

export interface WishlistContextType {
  wishlist: WishListItem[];
  loading: boolean;
  addToWishlist: (item: Omit<WishListItem, 'id'>) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}
