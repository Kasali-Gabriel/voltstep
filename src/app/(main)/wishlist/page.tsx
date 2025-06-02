'use client';

import { WishList } from '@/components/Wishlist/WishList';
import { useWishlistContext } from '@/context/WishlistContext';

const Page = () => {
  const { wishlist } = useWishlistContext();
  return (
    <div className="flex w-full flex-col justify-center space-y-10 pt-4">
      {wishlist.length > 0 && (
        <h2 className="text-xl font-medium lg:text-2xl">
          Your WishList
          <span className="ml-2 text-base font-normal text-neutral-500">
            ({wishlist.length}) products
          </span>
        </h2>
      )}

      <WishList isPage />
    </div>
  );
};

export default Page;
