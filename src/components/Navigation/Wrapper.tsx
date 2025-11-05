'use client';

import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { useAdminSidebarStore } from '@/lib/state';
import { Catalog } from '@/types/product';
import { GoogleOneTap } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNavbar from '../Admin/Navigation/Navbar';
import AdminSideBar from '../Admin/Navigation/Sidebar';
import NotificationSidebar from '../Admin/Notifications/NotificationSidebar';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import FlashNews from './FlashNews';
import Footer from './Footer';
import Navbar from './Navbar';

export type WrapperProps = Readonly<{
  children: React.ReactNode;
  catalogs: Catalog[];
}>;

const Wrapper = ({ children, catalogs }: WrapperProps) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const { showSidebar, setShowSideBar, setShowNotificationSidebar } =
    useAdminSidebarStore();

  const isAuth =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isAdmin = pathname.startsWith('/admin');
  const isProductPage = pathname.startsWith('/product/');
  const isProductsListPage = pathname.startsWith('/products');
  const isSuccessPage = pathname.startsWith('/success');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setShowNotificationSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setShowNotificationSidebar]);

  // If on auth or admin page, don't provide user context
  if (isAuth) {
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

  if (isAdmin) {
    return (
      <SidebarProvider open={showSidebar} onOpenChange={setShowSideBar}>
        <AdminSideBar />

        <SidebarInset>
          <AdminNavbar />

          <main className="container mx-auto mt-5 flex w-full max-w-[1440px] min-w-0 flex-1 flex-col gap-4 p-4 px-4 py-8 pt-0 md:px-7">
            {children}
          </main>
        </SidebarInset>

        <NotificationSidebar />
      </SidebarProvider>
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
};

export default Wrapper;
