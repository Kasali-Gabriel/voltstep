import { useUser } from '@/context/UserContext';
import { AddReviewBtnProps } from '@/types/review';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { NotSignedInDialog } from '../Authentication/NotSignedInDialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import ReviewForm from './ReviewForm';

interface AddReviewBtnPropsWithCallback extends AddReviewBtnProps {
  onReviewChange?: () => void;
}

const AddReviewBtn = ({
  productId,
  reviews = [],
  onReviewChange,
}: AddReviewBtnPropsWithCallback) => {
  const { userId } = useUser();
  const [showDialog, setShowDialog] = useState(false);
  const [reviewForm, showReviewForm] = useState(false);

  // Find user's review for this product
  const userReview = useMemo(
    () => reviews.find((r) => r.reviewer?.id === userId),
    [reviews, userId],
  );

  const handleAddReview = () => {
    if (!userId) {
      setShowDialog(true);
      return;
    }

    showReviewForm(true);
  };

  return (
    <>
      <button
        onClick={handleAddReview}
        className="flex w-full cursor-pointer items-center justify-center rounded-4xl border border-black bg-white py-2 font-medium hover:bg-neutral-100"
      >
        <span className="hidden md:flex">
          {userReview ? 'Update your review' : 'Write a customer review'}
        </span>

        <span className="text-sm md:hidden">
          {userReview ? 'Update your review' : 'Review this product'}
        </span>
      </button>

      <NotSignedInDialog
        title="Sign in to review this product"
        description="Tried it? Loved it? Let others know! ✍️
        Sign in to share your thoughts, rate the product, and help the community make confident choices."
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />

      {reviewForm && (
        <Dialog open={reviewForm} onOpenChange={showReviewForm}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <div className="relative flex w-full items-center justify-center pt-5 md:pt-0">
                <DialogTitle className="mx-auto text-center text-lg font-normal md:text-2xl">
                  {userReview
                    ? 'Update Your Review'
                    : 'How would you rate this product?'}
                </DialogTitle>

                <DialogClose className="focus:ring-ring absolute top-0 right-0 z-50 -mt-4 -mr-4 flex size-8 cursor-pointer items-center justify-center rounded-full border bg-neutral-200 text-black transition hover:bg-neutral-400 focus:outline-none md:relative md:-mt-0 md:-mr-0 md:size-10">
                  <X strokeWidth={2} size={28} className="size-5 md:size-7" />
                </DialogClose>
              </div>

              <VisuallyHidden>
                <DialogDescription>review form dialog</DialogDescription>
              </VisuallyHidden>
            </DialogHeader>

            {userId && (
              <ReviewForm
                reviewerId={userId}
                productId={productId}
                defaultTitle={userReview?.title || ''}
                defaultDetails={userReview?.details || ''}
                defaultRating={userReview?.rating || 0}
                reviewId={userReview?.id}
                onSuccess={() => {
                  showReviewForm(false);
                  if (onReviewChange) onReviewChange();
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddReviewBtn;
