import { ViewWishlistProps } from '@/types/wishlist';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export const ViewWishlist = ({ isNavBar, setSheetOpen }: ViewWishlistProps) => {
  const handleClick = () => {
    if (setSheetOpen) {
      setSheetOpen(false);
    }
  };

  return (
    <Link
      href="/wishlist"
      className={`cursor-pointer rounded-full p-2 hover:bg-neutral-200 ${isNavBar ? 'hidden md:block' : ''}`}
      aria-label="View Wishlist"
      onClick={handleClick}
    >
      <Heart
        size={20}
        strokeWidth={1.25}
        className={isNavBar ? 'size-6' : 'size-8'}
      />
    </Link>
  );
};
