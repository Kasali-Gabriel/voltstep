import { useUser } from '@/context/UserContext';
import { useWishlistContext } from '@/context/WishlistContext';
import { AddToWishListProps } from '@/types/wishlist';
import { CircleCheck, Heart, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { NotSignedInDialog } from './NotSignedInDialog';

export const AddToWishList = ({
  productName,
  productImage,
  productPrice,
  productId,
  selectedSize,
  selectedColor,
}: AddToWishListProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const router = useRouter();

  const { userId } = useUser();

  const { wishlist, addToWishlist, removeFromWishlist, loading } =
    useWishlistContext();

  const inWishlist = wishlist.some((item) => item.productId === productId);

  // Scroll to top when success dialog is shown
  useEffect(() => {
    if (showSuccessDialog) {
      window.scrollTo({ top: 0 });
    }
  }, [showSuccessDialog]);

  const handleAddToWishlist = async () => {
    if (!userId) {
      setShowDialog(true);
      return;
    }

    if (!inWishlist) {
      await addToWishlist({ productId, selectedSize, selectedColor });

      setShowSuccessDialog(true);
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
    <div className="relative">
      <button
        onClick={handleAddToWishlist}
        disabled={loading}
        aria-pressed={!!inWishlist}
        aria-label={inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
        className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-4xl border border-stone-400 py-3 text-black hover:border-black disabled:opacity-60 sm:w-fit sm:rounded-xl sm:px-12 md:py-4 lg:w-full lg:rounded-4xl lg:px-8"
      >
        <span className="sm:hidden lg:block">
          {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </span>

        <Heart className={inWishlist ? 'fill-black' : ''} />
      </button>

      <NotSignedInDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />

      {showSuccessDialog && (
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent
            showCloseButton={false}
            className="top-[200px] w-[28rem] rounded-b-4xl border-t-0 px-7 md:left-[32.5rem] lg:left-[47.5rem] xl:left-[62.5rem]"
          >
            <DialogHeader className="flex w-full flex-row items-center justify-between">
              <DialogTitle className="flex items-center">
                <CircleCheck className="mr-2 size-7 fill-green-500 text-white" />{' '}
                Added to Wishlist
              </DialogTitle>

              <DialogClose className="focus:ring-ring flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-black transition hover:bg-neutral-400 focus:outline-none">
                <X strokeWidth={1.5} size={28} />
              </DialogClose>
            </DialogHeader>

            <div className="flex items-center space-x-4 px-1">
              <Image
                src={productImage ?? '/placeholder.png'}
                alt="item-image"
                width={100}
                height={100}
                className="size-24 border"
              />

              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-medium">{productName}</h2>

                <p className="flex space-x-2 font-medium text-neutral-500">
                  <span>{selectedColor}</span>
                  {selectedColor && selectedSize && <span>|</span>}
                  <span>{selectedSize}</span>
                </p>

                <p className="font-medium">${productPrice}</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/wishlist')}
              className="mt-5 cursor-pointer rounded-3xl bg-black py-4 text-center leading-tight font-medium text-white hover:bg-neutral-900"
            >
              View Wishlist
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
