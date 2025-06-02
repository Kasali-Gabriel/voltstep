import { RatingInputProps } from '@/types/review';
import { Star } from 'lucide-react';
import { useState } from 'react';

const RatingInput = ({
  value,
  onChange,
  size = 24,
  disabled = false,
  starClassName = '',
}: RatingInputProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Rating"
    >
      {Array.from({ length: 5 }).map((_, idx) => {
        const starValue = idx + 1;
        const isFilled =
          hovered !== null ? starValue <= hovered : starValue <= value;
        return (
          <button
            type="button"
            key={starValue}
            className="m-0 cursor-pointer border-none bg-transparent p-0 outline-none"
            onMouseEnter={() => !disabled && setHovered(starValue)}
            onMouseLeave={() => !disabled && setHovered(null)}
            onClick={() => !disabled && onChange(starValue)}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
            tabIndex={0}
            disabled={disabled}
          >
            <Star
              size={size}
              strokeWidth={1}
              className={`stroke-current text-[#FFA41C] ${starClassName}`}
              fill={isFilled ? '#FFA41C' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingInput;
