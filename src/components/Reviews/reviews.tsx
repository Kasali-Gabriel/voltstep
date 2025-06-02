import { Review } from '@/types/review';
import { isEqual } from 'lodash';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ReviewFilters, SelectedFilters } from './ReviewFilters';
import StarRating from './star-rating';

export const Reviews = ({ reviews }: { reviews: Review[] }) => {
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const reviewsRef = useRef<HTMLDivElement>(null);
  const reviewsPerPage = 10;
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [clamped, setClamped] = useState<{ [key: string]: boolean }>({});
  const contentRefs = useRef<{ [key: string]: HTMLParagraphElement | null }>(
    {},
  );

  // Filter, sort, and paginate
  const filtered = reviews
    .filter((r) => (rating ? r.rating === Number(rating) : true))
    .filter((r) => (verifiedOnly ? r.verified : true))
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const totalReviews = filtered.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const start = (page - 1) * reviewsPerPage;
  const end = Math.min(start + reviewsPerPage, totalReviews);
  const paginatedReviews = filtered.slice(start, end);

  useEffect(() => {
    const checkClamped = () => {
      const newClamped: { [key: string]: boolean } = {};

      paginatedReviews.forEach((review: Review) => {
        const el = contentRefs.current[review.id];
        if (el) newClamped[review.id] = el.scrollHeight > el.clientHeight;
      });

      if (!isEqual(clamped, newClamped)) {
        setClamped(newClamped);
      }
    };
    checkClamped();

    window.addEventListener('resize', checkClamped);

    return () => window.removeEventListener('resize', checkClamped);
  }, [paginatedReviews, expanded, clamped]);

  const prevPage = useRef(page);

  useEffect(() => {
    if (page !== prevPage.current) {
      if (reviewsRef.current) {
        console.log('Scrolling into view');
        reviewsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    prevPage.current = page;
  }, [page]);

  // Compute empty message if no reviews after filtering
  let emptyMsg = '';
  if (!totalReviews) {
    if (verifiedOnly) {
      emptyMsg = 'There are no reviews from verified buyers for this product.';
    } else if (rating) {
      emptyMsg = `There are no ${rating} star review${rating === '1' ? '' : 's'} for this product.`;
    } else {
      emptyMsg = 'No reviews yet.';
    }
  }

  return (
    <div
      ref={reviewsRef}
      className="flex w-full flex-col space-y-3 pt-2 text-sm sm:space-y-6"
    >
      <div>{/* TODO AI summarize customer reviews */}</div>

      <ReviewFilters
        rating={rating}
        setRating={setRating}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="mb-2 sm:hidden">
        <SelectedFilters
          rating={rating}
          setRating={setRating}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}
        />
      </div>

      {/* Show empty message if no reviews, else show reviews */}
      {!totalReviews ? (
        <div className="py-8 text-center text-neutral-500">{emptyMsg}</div>
      ) : (
        paginatedReviews.map((review) => {
          const dateObj =
            review.date instanceof Date ? review.date : new Date(review.date);
          return (
            <div
              key={review.id}
              className="flex flex-col items-start rounded-lg border border-neutral-200 bg-white p-4 shadow-sm md:p-6"
            >
              <div className="mb-3 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={review.reviewer?.imageUrl ?? ''} />

                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <p className="flex items-center justify-between space-x-10 sm:justify-normal">
                    <span className="font-medium text-neutral-900">
                      {review.reviewer.firstName} {review.reviewer.lastName}
                    </span>

                    {review.verified && (
                      <span className="text-sm font-medium text-green-700 sm:font-semibold">
                        Verified Buyer
                      </span>
                    )}
                  </p>

                  <span className="text-xs text-neutral-500">
                    Reviewed on{' '}
                    {dateObj.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="mb-2 font-semibold text-neutral-800">
                <span className="mr-3 inline-flex align-text-bottom">
                  <StarRating rating={review.rating} size={15} />
                </span>
                {review.title}
              </div>

              <p
                ref={(el) => {
                  contentRefs.current[review.id] = el;
                }}
                className={`leading-relaxed text-neutral-700 transition-all ${expanded[review.id] ? '' : 'line-clamp-4'}`}
              >
                {review.details}
              </p>

              {(clamped[review.id] || expanded[review.id]) && (
                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [review.id]: !prev[review.id],
                    }))
                  }
                  className="cursor-pointer text-blue-800 hover:underline"
                >
                  {expanded[review.id] ? (
                    <span className="flex items-center gap-1">
                      <ChevronUp className="size-6 text-stone-800" />
                      Read less
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <ChevronDown className="size-6 text-stone-800" />
                      Read more
                    </span>
                  )}
                </button>
              )}
            </div>
          );
        })
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex flex-col items-center justify-center gap-2">
          {page === 1 ? (
            <>
              <button
                className="mb-2 cursor-pointer rounded-full bg-black px-10 py-2 text-white hover:bg-neutral-900 disabled:opacity-50"
                onClick={() => setPage(2)}
                disabled={totalPages < 2}
                aria-label="Show more reviews"
              >
                Load more
              </button>

              <span className="text-sm text-neutral-700">
                {start + 1} - {end} of {totalReviews} reviews
              </span>
            </>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <button
                className="cursor-pointer rounded-full bg-black p-2 text-white hover:bg-neutral-800 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </button>

              <span className="text-sm text-neutral-700">
                {start + 1} - {end} of {totalReviews} reviews
              </span>

              <button
                className="cursor-pointer rounded-full bg-black p-2 text-white hover:bg-neutral-900 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-black"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
