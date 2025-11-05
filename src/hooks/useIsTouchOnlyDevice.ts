import { useEffect, useState } from 'react';

/**
 * useIsTouchOnlyDevice - React hook to determine if the device supports only touch input (no mouse).
 * Uses pointer and hover media queries to detect input types.
 * @returns [isTouchOnly, setIsTouchOnly]
 */
export const useIsTouchOnlyDevice = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [isTouchOnly, setIsTouchOnly] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkIsTouchOnly = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const hasHover = window.matchMedia('(hover: hover)').matches;

      // If the device doesn't support fine pointer or hover, it's likely a touch-only device
      setIsTouchOnly(!hasFinePointer && !hasHover);
    };

    checkIsTouchOnly();

    window.addEventListener('resize', checkIsTouchOnly);
    return () => window.removeEventListener('resize', checkIsTouchOnly);
  }, []);

  return [isClient ? isTouchOnly : false, setIsTouchOnly];
};
