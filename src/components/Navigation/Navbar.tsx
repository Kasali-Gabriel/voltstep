'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import bigLogo from '../../../public/logo.png';
import smallLogo from '../../../public/logoIcon.png';

import { Catalog } from '@/types/product';
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
import SearchView from '../Search/Search';
import SearchBar from '../Search/SearchBar';
import { ViewWishlist } from '../Wishlist/ViewWishlist';
import MobileMenu from './MobileMenu';
import NavMenu from './NavMenu';

const Navbar = ({ catalogs }: { catalogs: Catalog[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="relative flex h-16 flex-col items-center justify-center px-5 sm:px-10 xl:px-12">
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
        <div className="flex items-center justify-center space-x-4 md:hidden">
          <MobileMenu catalogs={catalogs} />

          <SearchView />
        </div>

        <div className="flex items-center space-x-10">
          <Link href="/" className="flex items-center">
            <Image
              src={bigLogo}
              height={35}
              alt="logo"
              className="hidden lg:block"
            />

            <Image
              src={smallLogo}
              height={55}
              alt="logo"
              className="ml-8 md:ml-0 lg:hidden"
            />
          </Link>

          <div className="hidden md:flex">
            <NavMenu catalogs={catalogs} />
          </div>
        </div>

        <div className="hidden items-center justify-center xl:flex">
          <SearchBar />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <div className="mt-2 hidden md:block xl:hidden">
            <SearchView />
          </div>

          <Bag />

          <ViewWishlist isNavBar />

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
                <div className="mt-1 cursor-pointer md:size-8">
                  <UserButton />
                </div>
              </SignedIn>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
