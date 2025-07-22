import { useEffect, useState } from 'react';

/**
 * useIsMobile - React hook to determine if the window width is below a given threshold.
 * Also disables mobile mode for landscape tablets/desktops (min-width: 900px & landscape).
 * @param maxWidth - The maximum width (in px) to consider as mobile. Default is 640.
 * @returns [isMobile, setIsMobile]
 */
export function useIsMobile(
  maxWidth: number = 640,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  // Always start with false to ensure SSR/client consistency
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after mount
    setIsClient(true);

    const checkIsMobile = () => {
      if (
        window.matchMedia('(min-width: 900px) and (orientation: landscape)')
          .matches
      ) {
        setIsMobile(false);
      } else {
        setIsMobile(window.innerWidth < maxWidth);
      }
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [maxWidth]);

  // Return consistent state during SSR/hydration
  return [isClient ? isMobile : false, setIsMobile];
}
