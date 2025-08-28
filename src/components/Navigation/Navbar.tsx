'use client';

import bigLogo from '@/assets/logo.png';
import smallLogo from '@/assets/logoIcon.png';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useRef, useState } from 'react';

import {
  useNavBarStore,
  useProductHeaderStore,
  useWishlistSuccessDialogStore,
} from '@/lib/state';
import { Catalog } from '@/types/product';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bag } from '../Bag/Bag';
import SearchView from '../Search/Search';
import SearchBar from '../Search/SearchBar';
import UserProfile from '../User/UserProfile';
import { ViewWishlist } from '../Wishlist/ViewWishlist';
import MobileMenu from './MobileMenu';
import NavMenu from './NavMenu';

const Navbar = ({ catalogs }: { catalogs: Catalog[] }) => {
  const [isClient, setIsClient] = useState(false);
  const [ready, setReady] = useState(false);

  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLElement>(null);
  const {
    navbarHeight,
    showNavBar,
    setShowNavBar,
    setNavbarHeight,
    isFixed,
    setIsFixed,
  } = useNavBarStore();
  const { productHeaderStuck } = useProductHeaderStore();

  const pathname = usePathname();

  const isCheckOutPage = pathname.startsWith('/checkout');

  const { showSuccessDialog } = useWishlistSuccessDialogStore();

  // Set initial visibility and client flags
  useEffect(() => {
    setShowNavBar(true);
  }, [setShowNavBar]);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Track navbar height after render
  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      setNavbarHeight(height);
    }
  }, [setNavbarHeight]);

  // Handle scroll behavior for fixed and hide/show navbar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const navbarEl = navbarRef.current;

          if (!navbarEl) {
            ticking = false;
            return;
          }

          const height = navbarHeight || navbarEl.offsetHeight;
          const scrollingUp = currentScrollY < lastScrollY.current;

          // Fix and show navbar if it's scrolled past and user scrolls up
          if (!isFixed && currentScrollY > height && scrollingUp) {
            setIsFixed(true);
            setShowNavBar(true);
          }

          // If already fixed, toggle visibility based on scroll direction
          if (isFixed) {
            if (scrollingUp && !showNavBar) {
              setShowNavBar(true);
            } else if (!scrollingUp && showNavBar) {
              setShowNavBar(false);
            }

            // Unfix if user scrolls near top again
            if (currentScrollY <= height) {
              setIsFixed(false);
              setShowNavBar(true);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed, showNavBar, navbarHeight, setIsFixed, setShowNavBar]);

  return (
    <>
      {isFixed && <div style={{ height: navbarHeight }} />}

      <nav
        ref={navbarRef}
        id="navbar"
        className={`flex h-16 w-full flex-col items-center justify-center bg-white px-5 transition-transform ease-in-out sm:px-10 xl:px-12 ${showSuccessDialog ? 'z-60' : 'z-50'} ${isFixed ? (isCheckOutPage ? 'relative' : 'fixed top-0 left-0') : isCheckOutPage ? 'relative' : ''} ${showNavBar ? 'translate-y-0' : '-translate-y-full'} ${productHeaderStuck ? 'duration-0' : 'duration-300'}`}
      >
        <div
          className={`flex w-full items-center ${isCheckOutPage ? 'justify-start' : 'justify-between'}`}
        >
          <div className="flex items-center justify-center space-x-4 lg:landscape:hidden">
            {!isCheckOutPage && <MobileMenu catalogs={catalogs} />}

            <Image
              src={bigLogo}
              height={35}
              alt="logo"
              className="ob hidden md:block lg:landscape:hidden"
            />

            {!isCheckOutPage && (
              <div className="flex md:hidden">
                <SearchView />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-10">
            <Link href="/" className="flex items-center">
              <Image
                src={bigLogo}
                height={35}
                alt="logo"
                className="hidden lg:landscape:block"
              />

              <Image
                src={smallLogo}
                height={55}
                alt="logo"
                className={`md:hidden ${isCheckOutPage ? '' : 'ml-8'}`}
              />
            </Link>

            {!isCheckOutPage && (
              <div className="hidden lg:landscape:flex">
                <NavMenu catalogs={catalogs} />
              </div>
            )}
          </div>

          {!isCheckOutPage && (
            <div className="hidden items-center justify-center xl:flex">
              <SearchBar />
            </div>
          )}

          {!isCheckOutPage && (
            <div className="flex items-center space-x-4">
              <div className="mt-2 hidden md:block xl:hidden">
                <SearchView />
              </div>

              <Bag />

              <ViewWishlist isNavBar />

              <div className="relative size-7">
                {/* Placeholder icon during SSR/hydration */}
                {!isClient || !ready ? (
                  <div className="absolute inset-0 flex animate-pulse items-center justify-center opacity-100">
                    <Avatar className="size-7 cursor-pointer">
                      <AvatarFallback>
                        <User size={20} strokeWidth={1.25} />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="animate-in absolute inset-0 flex size-7 items-center">
                    <SignedIn>
                      <UserProfile />
                    </SignedIn>

                    <SignedOut>
                      <SignInButton>
                        <Avatar className="size-7 cursor-pointer transition-all duration-300">
                          <AvatarFallback>
                            <User size={20} strokeWidth={1.25} />
                          </AvatarFallback>
                        </Avatar>
                      </SignInButton>
                    </SignedOut>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
