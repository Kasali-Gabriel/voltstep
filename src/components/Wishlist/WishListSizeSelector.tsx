import { SizeSelector } from '@/components/Product/SizeSelectors';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { images } from '@/constants/images';
import { WishListSizeSelectorProps } from '@/types/wishlist';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNavBtn } from '../Product/swiperNavBtn';
import { X } from 'lucide-react';

const WishListSizeSelector = ({
  isPage,
  showSizeDialog,
  setShowSizeDialog,
  sizes,
  selectedSize,
  setSelectedSize,
  sizeError,
  setSizeError,
  item,
  handleAddToBag,
  handleProductLinkClick,
}: WishListSizeSelectorProps) => {
  // orientation state
  const [isPortrait, setIsPortrait] = useState(true);

  // Helper to check orientation
  const checkOrientation = React.useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    }
  }, []);

  useEffect(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [checkOrientation]);

  useEffect(() => {
    if (showSizeDialog) {
      checkOrientation();
    }
  }, [showSizeDialog, checkOrientation]);

  // Non-page view: dropdown
  if (!isPage && sizes.length > 0 && !item.selectedSize) {
    return (
      <div className="mt-2">
        <Select
          value={selectedSize}
          onValueChange={(val) => {
            setSelectedSize(val);
            setSizeError(false);
          }}
        >
          <SelectTrigger
            className={`mt-1 w-full cursor-pointer rounded-none bg-white text-black ${sizeError ? 'border-red-500' : 'border-neutral-300 hover:border-neutral-600'}`}
          >
            <SelectValue placeholder="Size" />
          </SelectTrigger>

          <SelectContent className="z-60">
            {sizes.map((size: string) => (
              <SelectItem
                className="pl-4 text-base hover:bg-neutral-300"
                key={size}
                value={size}
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {sizeError && (
          <p className="mt-1 text-xs text-red-500">
            Please select a size before adding to bag.
          </p>
        )}
      </div>
    );
  }

  // Page view: dialog
  if (
    isPage &&
    sizes.length > 0 &&
    !item.selectedSize &&
    showSizeDialog &&
    setShowSizeDialog
  ) {
    return (
      <Dialog
        open={showSizeDialog}
        onOpenChange={(open) => {
          setShowSizeDialog(open);
          if (!open) {
            setSizeError(false);
            setSelectedSize('');
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="h-[90vh] w-[90vw] rounded-3xl p-0 sm:max-w-[90vw] md:h-[80vh] md:w-[80vw] xl:w-[70vw]"
        >
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Select Size</DialogTitle>
            </DialogHeader>
          </VisuallyHidden>

          <div
            className={`grid h-full w-full portrait:grid-rows-[1.2fr_1fr] sm:portrait:grid-rows-2 lg:portrait:grid-rows-[2fr_1fr] sm:landscape:grid-cols-2 md:portrait:grid-rows-[1.4fr_1fr]`}
          >
            <div className="flex h-full w-[90vw] rounded-3xl p-0 md:w-[80vw] xl:h-[80vh] sm:landscape:w-full relative">
              <Swiper
                key={isPortrait ? 'portrait' : 'landscape'}
                slidesPerView={1}
                loop={true}
                modules={[Navigation, Pagination]}
                className="relative h-full w-full p-0 xl:rounded-t-none portrait:rounded-t-3xl landscape:rounded-l-3xl"
                pagination={
                  isPortrait ? { type: 'bullets', clickable: true } : false
                }
                allowTouchMove={isPortrait}
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
                  <SwiperSlide key={index} className="h-full w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        priority
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}

                <div className="portrait:hidden landscape:block">
                  <SwiperNavBtn />
                </div>
              </Swiper>

              <DialogClose className="focus:ring-ring border z-50 absolute top-4 right-4 flex size-10 md:size-14 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-black transition hover:bg-neutral-400 focus:outline-none landscape:hidden">
                <X strokeWidth={1.5} size={28} className='md:size-10'/>
              </DialogClose>
            </div>

            <div className="flex max-w-[90vw] flex-col p-4 sm:portrait:p-7 sm:landscape:py-7 lg:landscape:p-7">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-lg font-medium md:text-xl xl:text-2xl">
                    {item.product?.name}
                  </h2>

                  <p className="font-medium text-neutral-500 md:text-lg">
                    {item.selectedColor}
                  </p>

                  <p className="pt-2 font-medium md:text-lg">
                    ${item.product?.price}
                  </p>
                </div>

                <DialogClose className="focus:ring-ring ml-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-black transition hover:bg-neutral-400 focus:outline-none portrait:hidden">
                  <X strokeWidth={1.5} size={28} />
                </DialogClose>
              </div>

              <SizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                setSelectedSize={(size) => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                sizeError={sizeError}
                setSizeError={setSizeError}
                isTitle={false}
              />

              <div className="flex w-full flex-1 items-end">
                <div className="flex w-full items-center justify-between">
                  <Link
                    href={
                      item.product?.slug
                        ? `/products/${item.product.slug}`
                        : '#'
                    }
                    tabIndex={item.product?.slug ? 0 : -1}
                    onClick={handleProductLinkClick}
                    className="font-semibold text-neutral-700 underline underline-offset-2 hover:text-black"
                  >
                    View Full Product
                  </Link>

                  <button
                    className="h-fit w-[7rem] cursor-pointer rounded-4xl bg-black py-2 text-sm text-white hover:bg-stone-900 md:w-[8rem] md:text-base lg:w-[10rem] lg:py-3"
                    onClick={() => {
                      if (!selectedSize) {
                        setSizeError(true);
                        return;
                      }
                      setShowSizeDialog(false);
                      handleAddToBag();
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};

export default WishListSizeSelector;
