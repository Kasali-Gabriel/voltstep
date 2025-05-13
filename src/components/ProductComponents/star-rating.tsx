import { Star } from 'lucide-react';

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const partialStarWidth = Math.round((rating % 1) * 100); // Round the percentage width for better accuracy
  const maxStars = 5;
  const emptyStars = maxStars - fullStars - (partialStarWidth > 0 ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          size={14}
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
            size={14}
            strokeWidth={1}
            className="stroke-current text-[#FFA41C]"
            fill="currentColor"
            style={{ clipPath: `inset(0 ${100 - partialStarWidth}% 0 0)` }}
          />
          <Star
            size={14}
            strokeWidth={1}
            className="absolute top-0 left-0 stroke-current text-[#FFA41C]"
            fill="none"
          />
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star
          size={14}
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
