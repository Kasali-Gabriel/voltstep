import { subcategorySizeMapping } from '@/data/sizeData';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SizeSelectorProps } from '@/types/product';
import { forwardRef, useEffect, useRef, useState } from 'react';

export const SizeSelector = forwardRef<HTMLDivElement, SizeSelectorProps>(
  (
    {
      sizes,
      selectedSize,
      selectedColor,
      productColors,
      setSelectedSize,
      sizeError,
      setSizeError,
      isTitle = true,
      subcategoryName,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const selectedSizeRef = useRef<HTMLButtonElement | null>(null);

    // Get all sizes for the subcategory
    const allSizes = subcategorySizeMapping[subcategoryName];

 

    const [reorderedSizes, setReorderedSizes] = useState<string[]>(allSizes);
    const [isMobile] = useIsMobile();
    const [isScrolledAwayFromStart, setIsScrolledAwayFromStart] =
      useState(false);

    const isSizeAvailable = (size: string): boolean => {
      if (!selectedColor || !productColors) return false;

      const colorObj = productColors.find((c) => c.color === selectedColor);

      if (!colorObj) return false;

      const variant = colorObj.variants.find((v) => v.size === size);

      return !!variant && variant.quantity > 0;
    };

    useEffect(() => {
      // Update reordered sizes when subcategory or sizes change
      const sizesToUse = subcategorySizeMapping[subcategoryName];

      setReorderedSizes(sizesToUse);
    }, [sizes, subcategoryName]);

    useEffect(() => {
      if (isMobile && selectedSizeRef.current) {
        const button = selectedSizeRef.current;
        const container = button.closest(
          '.overflow-x-auto',
        ) as HTMLElement | null;

        if (container && button) {
          const containerScrollLeft = container.scrollLeft;
          const containerWidth = container.clientWidth;
          const buttonOffsetLeft = button.offsetLeft;
          const buttonWidth = button.offsetWidth;

          const isOutside =
            buttonOffsetLeft < containerScrollLeft ||
            buttonOffsetLeft + buttonWidth >
              containerScrollLeft + containerWidth;

          if (isOutside) {
            container.scrollTo({
              left: buttonOffsetLeft - containerWidth / 2 + buttonWidth / 2,
              behavior: 'smooth',
            });
          }
        }
      }
    }, [selectedSize, isMobile]);

    // Track scroll position for mobile/dialog
    useEffect(() => {
      if (isMobile && containerRef.current) {
        const container = containerRef.current;

        const onScroll = () => {
          setIsScrolledAwayFromStart(container.scrollLeft > 10);

          if (setSizeError) {
            setSizeError(false);
          }
        };

        container.addEventListener('scroll', onScroll);

        setIsScrolledAwayFromStart(container.scrollLeft > 10);

        return () => {
          container.removeEventListener('scroll', onScroll);
        };
      }
    }, [isMobile, setSizeError]);

    const handleSizeClick = (size: string) => {
      setSelectedSize(size);

      if (isMobile && containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const scrolledAway = scrollLeft > 10;

        if (scrolledAway) {
          // Move selected size to front, but keep all sizes in the reordered list
          const sizesToUse = subcategorySizeMapping[subcategoryName];
          setReorderedSizes([size, ...sizesToUse.filter((s) => s !== size)]);

          // Scroll to the start of the container
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    };

    // Compose className only once to avoid duplicate attributes
    const containerClassName = [
      'mt-2 flex gap-2 rounded-md py-1',
      isMobile && !isTitle ? 'overflow-x-auto  py-2' : 'flex-wrap',
      isScrolledAwayFromStart
        ? '-ml-4 w-[90vw] pr-4 transition-all duration-20'
        : 'w-fit max-w-full transition-all duration-20',
    ].join(' ');

    return (
      <div
        ref={ref}
        className={`flex w-full flex-col items-start justify-start ${isTitle ? 'mt-7' : 'md:mt-2 xl:mt-4'}`}
      >
        {isTitle && <h2 className="text-lg font-semibold">Select Size</h2>}

        <div ref={containerRef} className={containerClassName}>
          {reorderedSizes.map((size) => {
            const isAvailable = isSizeAvailable(size);
            return (
              <div key={size} className="flex flex-col items-center">
                <button
                  ref={selectedSize === size ? selectedSizeRef : null}
                  onClick={() => handleSizeClick(size)}
                  disabled={!isAvailable}
                  className={`flex h-10 w-18 items-center justify-center rounded-md border text-center transition-colors duration-150 ${
                    !isAvailable
                      ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
                      : selectedSize === size
                        ? 'cursor-pointer bg-black text-white hover:border-black'
                        : 'cursor-pointer border-stone-300 hover:border-black'
                  }`}
                  aria-label={`${isAvailable ? 'Select' : 'Unavailable'} size ${size}`}
                >
                  {size}
                </button>
              </div>
            );
          })}
        </div>

        {sizeError && (
          <p className="mt-2 text-sm text-red-500">
            Please select a size before adding to bag.
          </p>
        )}
      </div>
    );
  },
);

SizeSelector.displayName = 'SizeSelector';
