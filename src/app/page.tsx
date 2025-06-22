'use client';

import Footer from '@/components/Navigation/Footer';
import Header from '@/components/Navigation/Header';
import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';

export default function Home() {
  return (
    <UserProvider>
      <WishlistProvider>
        <div className="flex min-h-screen flex-col px-5 sm:px-10 xl:px-12">
          <Header />

          <main className="mt-16 flex flex-1 flex-col md:mt-[72px]">
            <div></div>
          </main>

          <div className="relative z-10 mt-auto pb-[80px] lg:pb-0">
            <Footer />
          </div>
        </div>
      </WishlistProvider>
    </UserProvider>
  );
}
