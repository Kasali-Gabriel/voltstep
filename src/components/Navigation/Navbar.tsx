'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

import {
  GoogleOneTap,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { Heart, ShoppingBag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchBar, SearchView } from '../Search/Search';
import MobileMenu from './MobileMenu';
import NavMenu from './NavMenu';

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="flex flex-col items-center justify-center p-2 sm:p-4 md:h-32 xl:h-16">
      {isClient && (
        <>
          <GoogleOneTap fedCmSupport={true} cancelOnTapOutside={false} />
          <div
            id="clerk-captcha"
            data-cl-theme="dark"
            data-cl-size="flexible"
            className="mt-2"
          />
        </>
      )}

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center space-x-5 md:hidden">
          <MobileMenu />

          <SearchView />
        </div>

        <div className="flex items-center justify-center space-x-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="logo"
              height={175}
              width={175}
              priority
              className="ml-10 hidden object-contain sm:block"
            />

            <Image
              src="/logoIcon.png"
              alt="logo"
              height={50}
              width={50}
              priority
              className="ml-7 scale-105 object-contain sm:hidden"
            />
          </Link>

          <div className="hidden xl:flex">
            <NavMenu />
          </div>
        </div>

        <div className="hidden items-center justify-center md:flex">
          <SearchBar />
        </div>

        <div className="flex items-center justify-center space-x-5 sm:space-x-7">
          <button className="flex cursor-pointer flex-col items-center space-y-0.5">
            <ShoppingBag size={20} strokeWidth={1.25} className="h-6 w-6" />
          </button>

          <button className="hidden cursor-pointer md:block">
            <Heart size={20} strokeWidth={1.25} className="h-6 w-6" />
          </button>

          {isClient && (
            <>
              <SignedOut>
                <SignInButton>
                  <Avatar className="cursor-pointer md:h-8 md:w-8">
                    <AvatarFallback>
                      <User size={20} strokeWidth={1.25} />
                    </AvatarFallback>
                  </Avatar>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="mt-1 cursor-pointer md:h-8 md:w-8">
                  <UserButton />
                </div>
              </SignedIn>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 hidden w-full items-center justify-start md:flex xl:hidden">
        <NavMenu />
      </div>
    </nav>
  );
};

export default Navbar;
