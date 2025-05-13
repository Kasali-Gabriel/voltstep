import StarRating from "./star-rating";

export const Ratings = ({
  reviews,
}: {
  reviews: Array<{ rating: number }>;
}) => {
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mt-0.5 flex items-end justify-center">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">{averageRating}</p>
        <StarRating rating={parseFloat(averageRating || '0')} />
        <p className="text-sm text-blue-700">({reviews.length})</p>
      </div>
    </div>
  );
};
