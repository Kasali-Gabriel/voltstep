'use client';
import { useWishlistContext } from '@/context/WishlistContext';
import { WishListItem } from '@/types/wishlist';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import heartSvg from '../../../public/SVGs/Pretty-Heart-SVG.svg';
import WishListItemCard from './WishListItemCard';

export const WishList = ({ isPage }: { isPage: boolean }) => {
  const { wishlist } = useWishlistContext();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="mt-10 flex max-w-[17.25rem] flex-col items-center justify-center">
          <Image src={heartSvg} alt="heart svg icon" height={100} />

          <h2 className="text-center text-lg font-medium uppercase mt-6">
            your wishlist is empty
          </h2>

          <p className="mt-2 text-center text-sm text-neutral-500">
            Tap the heart icon on anything you like — we&apos;ll save it here
            for you. When you&apos;re ready, add it to your bag, check out and gear
            up, and hit the gym.
          </p>

          <button className="mt-8 w-[80%] cursor-pointer rounded-3xl bg-black py-2.5 text-center leading-tight font-medium text-white hover:bg-neutral-900">
            SHOP MENS
          </button>

          <button className="mt-4 w-[80%] cursor-pointer rounded-3xl bg-gray-500 py-2.5 text-center leading-tight font-medium text-white hover:bg-gray-700">
            SHOP WOMENS
          </button>
        </div>
      </div>
    );
  }

  // Show only first 5 items if not page
  const itemsToShow = isPage ? wishlist : wishlist.slice(0, 5);
  const showViewAll = !isPage && wishlist.length > 5;

  return (
    <>
      <div
        className={
          isPage
            ? 'grid grid-cols-2 gap-x-5 gap-y-10 md:gap-y-16 lg:grid-cols-3'
            : 'flex flex-col space-y-10'
        }
      >
        {itemsToShow.map((item: WishListItem, idx) => (
          <WishListItemCard
            key={item.productId || idx}
            item={item}
            isPage={!!isPage}
          />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-6 flex justify-center">
          <Link
            href="/wishlist"
            className="flex w-full cursor-pointer items-center justify-center py-4 text-lg font-medium text-neutral-600 transition-colors hover:text-black"
          >
            View Full Wishlist
            <MoveRight strokeWidth={2} className="ml-3 size-8" />
          </Link>
        </div>
      )}
    </>
  );
};
