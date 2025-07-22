'use client';

import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Catalog } from '@/types/product';
import { usePathname } from 'next/navigation';
import FlashNews from './FlashNews';
import Footer from './Footer';
import Navbar from './Navbar';

export type WrapperProps = Readonly<{
  children: React.ReactNode;
  catalogs: Catalog[];
}>;

export default function Wrapper({ children, catalogs }: WrapperProps) {
  const pathname = usePathname();

  const isAuth = pathname === '/sign-in' || pathname === '/sign-up';

  const isHomePage = pathname === '/';

  return (
    <UserProvider>
      <WishlistProvider>
        <div className="w-full">
          <div id="header-stack">
            {!isAuth && <Navbar catalogs={catalogs} />}

            {!isAuth && !isHomePage && <FlashNews />}
          </div>

          <main>{children}</main>

          {!isAuth && <Footer />}
        </div>
      </WishlistProvider>
    </UserProvider>
  );
}
