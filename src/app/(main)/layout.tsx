'use client';

import FlashNews from '@/components/Navigation/FlashNews';
import Footer from '@/components/Navigation/Footer';
import Header from '@/components/Navigation/Header';
import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <WishlistProvider>
        <div className="g-full flex min-h-screen flex-col px-5 sm:px-10 xl:px-16">
          <Header />

          <main className="mt-16 grow md:mt-[72px] flex flex-col"><FlashNews />{children}</main>

          <div className="relative z-10 mt-auto pb-[80px] lg:pb-0">
            <Footer />
          </div>
        </div>
      </WishlistProvider>
    </UserProvider>
  );
}
