'use client';

import { useWishlistSuccessDialogStore } from '@/lib/state';
import { Catalog } from '@/types/product';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';

let catalogCache: Catalog[] | null = null;

const Header = () => {
  const lastScrollY = useRef(0);
  const [showHeader, setShowHeader] = useState(true);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  const { showSuccessDialog } = useWishlistSuccessDialogStore();

  useEffect(() => {
    const fetchCatalogData = async () => {
      if (catalogCache) {
        setCatalogs(catalogCache);
        return;
      }

      try {
        const res = await axios.get('/api/products/catalogdata');

        catalogCache = res.data as Catalog[];

        setCatalogs(catalogCache);
      } catch (error) {
        console.error('Error fetching catalog data:', error);

        setCatalogs([]);
      }
    };

    fetchCatalogData();
  }, []);

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
      className={`fixed top-0 left-0 w-full transform bg-white transition-transform duration-300 ease-in-out ${showSuccessDialog ? 'z-60' : 'z-50'} ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {catalogs.length > 0 && <Navbar catalogs={catalogs} />}
    </header>
  );
};

export default Header;
