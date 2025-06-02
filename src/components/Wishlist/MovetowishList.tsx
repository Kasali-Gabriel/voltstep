import { useUser } from '@/context/UserContext';
import { useWishlistContext } from '@/context/WishlistContext';
import { AddToWishListProps } from '@/types/wishlist';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

export const MoveToWishList = ({
  productName,
  productId,
  selectedSize,
  selectedColor,
  setActiveTab,
}: AddToWishListProps) => {
  const { userId } = useUser();

  const { wishlist, addToWishlist, removeFromWishlist, loading } =
    useWishlistContext();

  const inWishlist = wishlist.some((item) => item.productId === productId);

  const handleMoveToWishlist = async () => {
    if (!userId) {
      setActiveTab?.('wishlist');
      return;
    }
    if (!inWishlist) {
      await addToWishlist({ productId, selectedSize, selectedColor });

      toast('Wishlist updated', {
        description: (
          <p>
            <span className="font-semibold">{productName}</span> added to
            Wishlist!
          </p>
        ),
      });
    } else {
      await removeFromWishlist(productId);

      toast('Wishlist updated', {
        description: (
          <p>
            <span className="font-semibold">{productName}</span> removed from
            Wishlist!
          </p>
        ),
      });
    }
  };

  return (
    <>
      <button
        onClick={handleMoveToWishlist}
        disabled={loading}
        className="flex cursor-pointer items-center justify-center rounded-full border bg-white p-2 transition hover:bg-neutral-200 disabled:opacity-60"
      >
        <Heart
          size={20}
          strokeWidth={1}
          className={inWishlist ? 'fill-black' : ''}
        />
      </button>
    </>
  );
};
