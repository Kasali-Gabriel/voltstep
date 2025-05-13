import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const SwiperNavBtns = () => {
  const swiper = useSwiper();

  return (
    <div className="absolute bottom-0 z-50 flex w-full -translate-y-1/2 items-center justify-end gap-2 pr-5">
      <button
        className="size-10 cursor-pointer justify-items-center rounded-full bg-white text-black hover:bg-neutral-100"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeft strokeWidth={2} size={30} />
      </button>

      <button
        className="size-10 cursor-pointer justify-items-center rounded-full bg-white text-black hover:bg-neutral-100"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRight strokeWidth={2} size={30} />
      </button>
    </div>
  );
};

export const DeliverySwiper = () => (
  <Swiper
    slidesPerView="auto"
    modules={[Pagination]}
    grabCursor={true}
    loop={true}
    pagination={{
      type: 'bullets',
      clickable: true,
    }}
    style={
      {
        '--swiper-pagination-bottom': '10px',
      } as React.CSSProperties
    }
  >
    <SwiperSlide className="w-full cursor-grab py-2">
      <div className="rounded-lg border-2 border-gray-200 bg-neutral-50 p-4 shadow-sm">
        <h4 className="font-medium text-gray-900">Standard Delivery</h4>
        <p className="text-sm text-gray-600">Prices and thresholds vary. .</p>
      </div>
    </SwiperSlide>

    <SwiperSlide className="w-full cursor-grab py-2">
      <div className="rounded-lg border-2 border-gray-200 bg-neutral-50 p-4 shadow-sm">
        <h4 className="font-medium text-gray-900">Express Delivery</h4>
        <p className="text-sm text-gray-600">
          2–4 working days. Available at checkout.
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
);

export const SmallScreenSwiper = ({
  images,
}: {
  images: Array<{ src: string; alt: string }>;
}) => {
  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView="auto"
        loop={true}
        pagination={{ type: 'bullets', clickable: true }}
        modules={[Pagination]}
        className="h-full w-full"
        style={
          {
            '--swiper-pagination-color': 'black',
            '--swiper-pagination-bullet-size': '10px',
            '--swiper-pagination-bullet-inactive-color': 'gray',
            '--swiper-pagination-bullet-inactive-opacity': '1',
          } as React.CSSProperties
        }
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                className="h-[65vh] w-screen border object-cover shadow-lg transition-transform duration-300"
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const LargeScreenSwiper = ({
  images,
}: {
  images: Array<{ src: string; alt: string }>;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="sticky top-10 flex h-[32rem] gap-5 lg:max-w-[45vw] xl:h-[37.5rem]">
      {/* Thumbnail */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={8}
        direction="vertical"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Navigation]}
        className="thumbs flex h-full w-[70px] items-center justify-center gap-2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <button className="h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full rounded object-cover"
                width={100}
                height={100}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Images */}
      <Swiper
        slidesPerView={1}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        allowTouchMove={window.innerWidth <= 1024}
        modules={[Navigation, Thumbs]}
        className="relative h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                className="h-[65vh] w-auto border object-cover shadow-lg transition-transform duration-300 lg:h-[32rem] lg:w-full lg:rounded-lg xl:h-[37.5rem]"
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
        ))}

        <SwiperNavBtns />
      </Swiper>
    </div>
  );
};
