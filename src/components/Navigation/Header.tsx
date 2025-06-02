'use client';

import { useWishlistSuccessDialogStore } from '@/lib/state';
import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';

const Header = () => {
  const lastScrollY = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  const { showSuccessDialog } = useWishlistSuccessDialogStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full transform bg-white px-5 transition-transform duration-300 ease-in-out sm:px-10 xl:px-16 ${showSuccessDialog ? 'z-60' : 'z-50'} ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <Navbar />
    </header>
  );
};

export default Header;
