import StarRating from './star-rating';

export const RatingsPreview = ({
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
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <StarRating size={22} rating={parseFloat(averageRating)} />

        <p className="mt-0.5 text-lg sm:text-base lg:text-lg xl:text-xl">
          <span>{averageRating}</span> out of <span>5</span>
        </p>
      </div>

      <p className="mt-2 text-lg text-neutral-600">
        {reviews.length} global ratings
      </p>

      <div className="mt-4 flex w-[90%] flex-col gap-2 md:w-full">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviews.filter((r) => r.rating === star).length;
          const percent = hasReviews ? (count / reviews.length) * 100 : 0;
          return (
            <div
              key={star}
              className="mb-1 flex items-center gap-3 text-blue-600"
            >
              <span className="w-fit text-right text-base font-medium">
                {star} star
              </span>

              <div className="h-5 flex-1 rounded bg-neutral-200">
                <div
                  className="h-5 rounded bg-[#FFA41C]"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <span className="flex w-10 justify-end text-lg">
                {percent.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
