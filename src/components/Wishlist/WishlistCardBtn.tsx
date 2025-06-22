import { AddToBagButtonProps } from '@/types/cart';
import { RemoveFromWishlistButtonProps } from '@/types/wishlist';
import { Heart } from 'lucide-react';

export const AddToBagButton = ({ onClick, className }: AddToBagButtonProps) => (
  <button
    onClick={onClick}
    className={`mt-4 w-fit cursor-pointer rounded-4xl border border-stone-400 px-3 py-1.5 text-center text-sm text-black hover:border-black disabled:opacity-60 sm:px-5 sm:text-base ${className || ''}`}
  >
    Add to Bag
  </button>
);

export const RemoveFromWishlistButton = ({
  onClick,
  disabled,
  className,
}: RemoveFromWishlistButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label="Remove from Wishlist"
    className={`cursor-pointer items-center justify-center rounded-full border bg-white p-2 hover:bg-neutral-200 ${className || ''}`}
  >
    <Heart className="fill-black" />
  </button>
);
