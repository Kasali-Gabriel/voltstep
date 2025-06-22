import { useEffect, useRef, useState } from 'react';

export function useShadowOnScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [notAtBottom, setNotAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      setIsScrolled(el.scrollTop > 0);
      setNotAtBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, setIsScrolled]);

  return { isScrolled, setIsScrolled, scrollRef, notAtBottom, setNotAtBottom };
}
