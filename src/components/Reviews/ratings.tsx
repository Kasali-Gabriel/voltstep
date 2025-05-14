import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ChevronRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import StarRating from './star-rating';
import { RatingsPreview } from './ratingsPreview';

export const Ratings = ({
  reviews,
}: {
  reviews: Array<{ rating: number }>;
}) => {
  const hasReviews = reviews.length > 0;
  const averageRating = hasReviews
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      ).toFixed(1)
    : '0.0';

  // Detect touch device
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

  const handleScrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView(); // Instant jump, no smooth scroll
    }
  };

  return (
    <div className="mt-0.5 flex items-end justify-center">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer rounded-md border-2 border-white hover:border-black">
              <div
                className="flex gap-2 p-1"
                {...(isTouchDevice ? { onClick: handleScrollToReviews } : {})}
              >
                {hasReviews && (
                  <p className="text-sm font-medium">{averageRating}</p>
                )}
                <StarRating rating={parseFloat(averageRating)} />
              </div>
            </TooltipTrigger>

            <TooltipContent
              collisionPadding={10}
              avoidCollisions={true}
              className="flex w-fit flex-col items-center justify-center space-y-4 rounded-md border bg-white p-4 px-10 shadow-md"
            >
              <div className="border-b-2">
                <RatingsPreview reviews={reviews} />
              </div>

              <button
                onClick={handleScrollToReviews}
                className="flex cursor-pointer items-center justify-center text-sm font-semibold text-neutral-700 underline-offset-2 hover:text-black hover:underline"
              >
                <span>See customer reviews</span>
                <ChevronRight size={15} />
              </button>

              <TooltipPrimitive.Arrow className="z-50 size-4 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] border-r border-b bg-white fill-white" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <button
          onClick={handleScrollToReviews}
          className="cursor-pointer text-sm text-blue-700 underline-offset-4 hover:underline"
        >
          ({reviews.length})
        </button>
      </div>
    </div>
  );
};
