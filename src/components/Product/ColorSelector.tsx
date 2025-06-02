import { colorHexCodes } from '@/constants/colorData';
import { ColorSelectorProps } from '@/types';
import { useEffect, useRef, useState } from 'react';

export const ColorSelector = ({
  colors,
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedColorRef = useRef<HTMLButtonElement | null>(null);
  const [reorderedColors, setReorderedColors] = useState<string[]>(colors);

  const [isMobile, setIsMobile] = useState(false);
  const [isScrolledAwayFromStart, setIsScrolledAwayFromStart] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setReorderedColors(colors); // Reset when color list changes
  }, [colors]);

  useEffect(() => {
    if (isMobile && selectedColorRef.current) {
      const button = selectedColorRef.current;
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
          buttonOffsetLeft + buttonWidth > containerScrollLeft + containerWidth;

        if (isOutside) {
          container.scrollTo({
            left: buttonOffsetLeft - containerWidth / 2 + buttonWidth / 2,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [selectedColor, isMobile]);

  // Track scroll position
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const onScroll = () => {
      setIsScrolledAwayFromStart(container.scrollLeft > 10);
    };

    container.addEventListener('scroll', onScroll);

    setIsScrolledAwayFromStart(container.scrollLeft > 10);

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [isMobile]);


  const handleColorClick = (color: string) => {
    setSelectedColor(color);

    if (isMobile && containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const isScrolledAwayFromStart = scrollLeft > 10;

      if (isScrolledAwayFromStart) {
        // Move selected color to front
        setReorderedColors([color, ...colors.filter((c) => c !== color)]);

        // Scroll back to start
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="mt-5 flex max-w-[90vw] flex-col items-start justify-start">
      <div
        ref={containerRef}
        className={`flex gap-4 overflow-x-auto px-3 py-2 pt-2 sm:flex-wrap ${isScrolledAwayFromStart ? 'w-screen -ml-4' : 'w-full'}`}
      >
        {reorderedColors.map((color: string) => (
          <div key={color} className="flex flex-col items-center">
            <button
              ref={selectedColor === color ? selectedColorRef : null}
              onClick={() => handleColorClick(color)}
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
