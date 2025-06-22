import { useSearchFocus } from '@/lib/state';
import { ProductCardFlexibleProps } from '@/types/product';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCardSkeleton from '../Skeletons/ProductCardSkeleton';

const ProductCard = ({
  SearchedProduct,
  setQuery,
  loading,
  recordViewedProduct,
  isPage,
  query,
}: ProductCardFlexibleProps) => {
  const { setIsFocused } = useSearchFocus();

  const handleLink = () => {
    setIsFocused(false);
    setQuery?.('');
    if (isPage && SearchedProduct && recordViewedProduct) {
      recordViewedProduct(SearchedProduct);
    }
  };

  return (
    <>
      {loading ? (
        <ProductCardSkeleton isPage={isPage} />
      ) : (
        <div className="flex w-full flex-col">
          <Link
            href={`/product/${SearchedProduct?.slug}`}
            onClick={handleLink}
            tabIndex={SearchedProduct?.slug ? 0 : -1}
          >
            <Image
              src={SearchedProduct?.image || '/placeholder.png'}
              alt="item-image"
              width={isPage ? 1024 : 900}
              height={1024}
              className="h-auto w-full cursor-pointer border object-cover"
            />
          </Link>

          <div className="mt-2 flex w-full items-start justify-between">
            <Link
              href={`/product/${SearchedProduct?.slug}`}
              className="flex items-center"
              onClick={handleLink}
            >
              <h2 className="cursor-pointer font-medium md:text-lg">
                {SearchedProduct?.name}
              </h2>
            </Link>

            {isPage && (
              <span className="mt-1 ml-2 hidden items-center text-xs sm:flex md:text-sm">
                <StarIcon className="mr-0.5 size-3 fill-black" />
                {SearchedProduct?.avgRating}
              </span>
            )}
          </div>

          {/* product parent catalog and subcategory */}
          {query && (
            <p className="text-sm font-medium text-neutral-600 capitalize md:text-base">
              {SearchedProduct?.catSubcat}
            </p>
          )}

          {isPage && (
            <p className="text-sm font-medium text-neutral-600 md:text-base">
              {SearchedProduct?.availableColors}

              {typeof SearchedProduct?.availableColors === 'number' && (
                <span> colors</span>
              )}
            </p>
          )}

          <p className="mt-2 font-medium md:text-base">
            ${SearchedProduct?.price}
          </p>
        </div>
      )}
    </>
  );
};

export default ProductCard;
