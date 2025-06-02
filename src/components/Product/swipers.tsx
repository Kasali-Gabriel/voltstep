import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNavBtn } from './swiperNavBtn';

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
                className="h-[90vh] w-screen border object-cover shadow-lg transition-transform duration-300"
                width={600}
                height={800}
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
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div className="sticky top-10 flex h-[32rem] gap-5 will-change-transform lg:max-w-[45vw] xl:h-[37.5rem]">
      {/* Thumbnail */}
      <Swiper
        onSwiper={setMainSwiper}
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
            <button
              className={`h-full w-full transition-opacity ${
                index === activeIndex ? 'opacity-100' : 'opacity-50'
              }`}
              onMouseEnter={() => {
                if (mainSwiper) {
                  mainSwiper.slideToLoop(index, 0, false);
                }
              }}
              onClick={() => {
                mainSwiper?.slideToLoop(index, 0, false);
                setActiveIndex(index);
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full rounded object-cover cursor-grab lg:cursor-default"
                width={600}
                height={800}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Images */}
      {/* FIXME images on swipers not optimized beacause of size  */}
      <Swiper
        key={isMobile ? 'mobile' : 'desktop'}
        slidesPerView={1}
        onSwiper={setMainSwiper}
        loop={true}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        allowTouchMove={isMobile}
        modules={[Navigation, Thumbs]}
        className="relative h-full w-full rounded-md"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                priority
                height={800}
                width={600}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}

        <SwiperNavBtn />
      </Swiper>
    </div>
  );
};
