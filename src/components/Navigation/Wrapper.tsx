'use client';

import { UserContextType, UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Catalog } from '@/types/product';

import { usePathname } from 'next/navigation';
import FlashNews from './FlashNews';
import Footer from './Footer';
import Navbar from './Navbar';

export type WrapperProps = Readonly<{
  children: React.ReactNode;
  catalogs: Catalog[];
  user: UserContextType;
}>;

export default function Wrapper({ children, catalogs, user }: WrapperProps) {
  const pathname = usePathname();
  const isAuth = pathname === '/sign-in' || pathname === '/sign-up';
  const isHomePage = pathname === '/';

  // If on auth page, don't provide user context
  if (isAuth) {
    return (
      <div className="w-full">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <UserProvider user={user}>
      <WishlistProvider userId={user!.id}>
        <div className="w-full">
          <div id="header-stack">
            <Navbar catalogs={catalogs} user={user!} />
            {!isHomePage && <FlashNews />}
          </div>
          <main>{children}</main>
          <Footer />
        </div>
      </WishlistProvider>
    </UserProvider>
  );
}
