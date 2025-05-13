import { colorHexCodes } from '@/constants/colorData';
import { ColorSelectorProps, SizeSelectorProps } from '@/types';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import StarRating from './ProductComponents/star-rating';

export const ColorSelector = ({
  colors,
  selectedColor,
  setSelectedColor,
  isMobile,
}: ColorSelectorProps) => {
  const selectedColorRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isMobile && selectedColorRef.current) {
      const buttonElement = selectedColorRef.current;
      const parentContainer = buttonElement.closest('.overflow-x-auto');
      if (parentContainer) {
        const offsetLeft =
          buttonElement.offsetLeft - parentContainer.scrollLeft;
        parentContainer.scrollTo({ left: offsetLeft, behavior: 'smooth' });
      }
    }
  }, [selectedColor, isMobile]);

  return (
    <div className="mt-7 flex flex-col items-start justify-start">
      <h2 className="text-lg font-semibold">Colors</h2>
      <div className="flex w-full max-w-[90vw] gap-4 overflow-x-auto px-3 py-2 pt-2 sm:flex-wrap">
        {colors.map((color: string) => (
          <div key={color} className="flex flex-col items-center">
            <button
              ref={selectedColor === color ? selectedColorRef : null}
              onClick={() => setSelectedColor(color)}
              className={`h-12 w-12 cursor-pointer rounded-full border-2 ${
                selectedColor === color
                  ? 'ring-ring/50 ring-4 ring-offset-4'
                  : ''
              }`}
              style={{
                backgroundColor:
                  colorHexCodes[color as keyof typeof colorHexCodes] ||
                  undefined,
              }}
              aria-label={`Select color ${color}`}
            />
            <p className="mt-2 text-sm text-gray-700">{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SizeSelector = ({
  sizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => (
  <div className="mt-7 flex flex-col items-start justify-start">
    <h2 className="text-lg font-semibold">Sizes</h2>
    <div className="mt-2 flex flex-wrap gap-2">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center">
          <button
            onClick={() => setSelectedSize(size)}
            className={`flex h-10 w-14 cursor-pointer items-center justify-center rounded-md text-center ${
              selectedSize === size ? 'bg-primary' : 'border border-black'
            }`}
            aria-label={`Select size ${size}`}
          >
            {size}
          </button>
        </div>
      ))}
    </div>
  </div>
);

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

export const SwiperComponent = () => (
  <Swiper
    slidesPerView="auto"
    modules={[Pagination]}
    grabCursor={true}
    loop={true}
    pagination={{ type: 'bullets', clickable: true }}
  >
    <SwiperSlide className="w-full cursor-grab">
      <div className="rounded-lg border-2 border-gray-200 bg-neutral-50 p-4 shadow-sm">
        <h4 className="font-medium text-gray-900">Standard Delivery</h4>
        <p className="text-sm text-gray-600">
          Prices and thresholds vary.{' '}
          <a href="#" className="text-blue-600 underline">
            Details
          </a>
          .
        </p>
      </div>
    </SwiperSlide>
    <SwiperSlide className="w-full cursor-grab">
      <div className="rounded-lg border-2 border-gray-200 bg-neutral-50 p-4 shadow-sm">
        <h4 className="font-medium text-gray-900">Express Delivery</h4>
        <p className="text-sm text-gray-600">
          2–4 working days. Available at checkout.
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
);
