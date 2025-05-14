import { Star } from 'lucide-react';

const StarRating = ({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) => {
  const fullStars = Math.floor(rating);
  const partialStarWidth = Math.round((rating % 1) * 100);
  const maxStars = 5;
  const emptyStars = maxStars - fullStars - (partialStarWidth > 0 ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          size={size}
          strokeWidth={1}
          key={`full-${index}`}
          className="stroke-current text-[#FFA41C]"
          fill="currentColor"
        />
      ))}

      {/* Partial star */}
      {partialStarWidth > 0 && (
        <div className="relative">
          <Star
            size={size}
            strokeWidth={1}
            className="stroke-current text-[#FFA41C]"
            fill="currentColor"
            style={{ clipPath: `inset(0 ${100 - partialStarWidth}% 0 0)` }}
          />
          <Star
            size={size}
            strokeWidth={1}
            className="absolute top-0 left-0 stroke-current text-[#FFA41C]"
            fill="none"
          />
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star
          size={size}
          strokeWidth={1}
          key={`empty-${index}`}
          className="stroke-current text-[#FFA41C]"
          fill="none"
        />
      ))}
    </div>
  );
};

export default StarRating;
