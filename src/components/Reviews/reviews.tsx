import { Review } from '@/types/review';
import { isEqual } from 'lodash';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Pagination, usePagination } from '../Navigation/Pagination';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ReviewFilters, SelectedFilters } from './ReviewFilters';
import StarRating from './star-rating';

export const Reviews = ({ reviews }: { reviews: Review[] }) => {
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Filter, sort, and paginate
  const filtered = reviews
    .filter((r) => (rating ? r.rating === Number(rating) : true))
    .filter((r) => (verifiedOnly ? r.verified : true))
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  // Use pagination hook
  const pagination = usePagination({
    totalItems: filtered.length,
    pageSize: reviewsPerPage,
    initialPage: 1,
    scrollRef: reviewsRef,
  });

  const paginatedReviews = filtered.slice(pagination.start, pagination.end);

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

  // Compute empty message if no reviews after filtering
  let emptyMsg = '';
  if (!pagination.totalItems) {
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
      {!pagination.totalItems ? (
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
                    {getInitials(
                      review.reviewer.firstName,
                      review.reviewer.lastName,
                    )}
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
      <Pagination
        page={pagination.page}
        setPage={pagination.setPage}
        totalPages={pagination.totalPages}
        start={pagination.start}
        end={pagination.end}
        totalItems={pagination.totalItems}
        itemLabel="reviews"
      />
    </div>
  );
};
