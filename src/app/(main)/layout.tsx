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
        <div className="flex min-h-screen w-full flex-col">
          <Header />

          <main className="mt-16 flex flex-col md:mt-[72px]">
            <FlashNews />
            {children}
          </main>

          <div className="relative z-10 mt-auto pb-[80px] lg:pb-0">
            <Footer />
          </div>
        </div>
      </WishlistProvider>
    </UserProvider>
  );
}
