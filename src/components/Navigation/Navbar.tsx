'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import bigLogo from '../../../public/logo.png';
import smallLogo from '../../../public/logoIcon.png';

import {
  GoogleOneTap,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Bag } from '../Bag/Bag';
import { SearchBar, SearchView } from '../Search/Search';
import { Wishlist } from '../Wishlist/WishList';
import MobileMenu from './MobileMenu';
import NavMenu from './NavMenu';

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="flex h-16 flex-col items-center justify-center p-2 sm:p-4 md:h-32 xl:h-16">
      {isClient && (
        <>
          <GoogleOneTap fedCmSupport={true} cancelOnTapOutside={false} />
          <div
            id="clerk-captcha"
            data-cl-theme="dark"
            data-cl-size="flexible"
            className="absolute top-52"
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
              src={bigLogo}
              height={40}
              alt="logo"
              className="hidden sm:block"
            />

            <Image
              src={smallLogo}
              height={55}
              alt="logo"
              className="ml-7 sm:hidden"
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
          <Bag />

          <Wishlist />

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
                {/* TODO cutom drop down menu wit clerks accout profile signout, then manage orders */}
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
