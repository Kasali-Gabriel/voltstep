'use client';

import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Catalog } from '@/types/product';
import { GoogleOneTap } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import FlashNews from './FlashNews';
import Footer from './Footer';
import Navbar from './Navbar';

export type WrapperProps = Readonly<{
  children: React.ReactNode;
  catalogs: Catalog[];
}>;

export default function Wrapper({ children, catalogs }: WrapperProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const isAuth =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isAdmin = pathname === '/admin';
  const isProductPage = pathname.startsWith('/product/');
  const isProductsListPage = pathname.startsWith('/products');
  const isSuccessPage = pathname.startsWith('/success');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If on auth or admin page, don't provide user context
  if (isAuth || isAdmin) {
    return (
      <div className="w-full">
        <main>{children}</main>
      </div>
    );
  }

  if (isSuccessPage) {
    return (
      <UserProvider>
        <div className="w-full">
          <main>{children}</main>
        </div>
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <WishlistProvider>
        <div className="flex h-full min-h-screen w-full flex-col">
          {isClient && (
            <>
              <GoogleOneTap fedCmSupport={true} cancelOnTapOutside={false} />
              <div
                id="clerk-captcha"
                data-cl-theme="dark"
                data-cl-size="flexible"
              />
              <style jsx global>{`
                #clerk-captcha:not(:empty) {
                  position: fixed !important;
                  height: 100vh !important;
                  width: 100vw !important;
                  top: 0 !important;
                  left: 0 !important;
                  right: 0 !important;
                  bottom: 0 !important;
                  z-index: 100 !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  background: rgba(0, 0, 0, 0.5) !important;
                  backdrop-filter: blur(4px) !important;
                }
              `}</style>
            </>
          )}

          <div id="header-stack" className="relative z-50">
            <Navbar catalogs={catalogs} />
          </div>

          {(isProductPage || isProductsListPage) && <FlashNews />}

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </WishlistProvider>
    </UserProvider>
  );
}
