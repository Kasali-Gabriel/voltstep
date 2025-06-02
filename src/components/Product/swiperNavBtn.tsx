import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwiper } from 'swiper/react';

export const SwiperNavBtn = () => {
  const swiper = useSwiper();

  return (
    <div className="absolute bottom-0 z-50 flex w-full -translate-y-1/2 items-center justify-end gap-2 pr-5">
      <button
        className="size-10 cursor-pointer justify-items-center rounded-full shadow-sm bg-white text-black hover:bg-neutral-100"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeft strokeWidth={2} size={30} />
      </button>

      <button
        className="size-10 cursor-pointer justify-items-center rounded-full shadow-sm bg-white text-black hover:bg-neutral-100"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRight strokeWidth={2} size={30} />
      </button>
    </div>
  );
};
