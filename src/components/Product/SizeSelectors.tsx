import { useIsMobile } from '@/hooks/useIsMobile';
import { SizeSelectorProps } from '@/types/product';
import { forwardRef, useEffect, useRef, useState } from 'react';

export const SizeSelector = forwardRef<HTMLDivElement, SizeSelectorProps>(
  (
    {
      sizes,
      selectedSize,
      setSelectedSize,
      sizeError,
      setSizeError,
      isTitle = true,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const selectedSizeRef = useRef<HTMLButtonElement | null>(null);
    const [reorderedSizes, setReorderedSizes] = useState<string[]>(sizes);
    const [isMobile] = useIsMobile();
    const [isScrolledAwayFromStart, setIsScrolledAwayFromStart] =
      useState(false);

    useEffect(() => {
      setReorderedSizes(sizes); // Reset when size list changes
    }, [sizes]);

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
          // Move selected size to front
          setReorderedSizes([size, ...sizes.filter((s) => s !== size)]);

          // Scroll to the start of the container
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    };

    // Compose className only once to avoid duplicate attributes
    const containerClassName = [
      'mt-2 flex gap-2 rounded-md border py-1',
      sizeError ? 'border-red-500 px-1' : 'border-transparent',
      isMobile && !isTitle
        ? 'overflow-x-auto border-transparent py-2'
        : 'flex-wrap',
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
          {reorderedSizes.map((size) => (
            <div key={size} className="flex flex-col items-center">
              <button
                ref={selectedSize === size ? selectedSizeRef : null}
                onClick={() => handleSizeClick(size)}
                className={`flex h-10 w-14 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-150 hover:border-black ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'border-stone-400'
                }`}
                aria-label={`Select size ${size}`}
              >
                {size}
              </button>
            </div>
          ))}
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
