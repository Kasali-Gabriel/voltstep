import { useSearchFocus } from '@/lib/state';
import { ProductCardFlexibleProps } from '@/types/product';
import { getSubcat, singularize } from '@/utils/getSubcat';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({
  isPage,
  SearchedProduct,
  setQuery,
  recordViewedProduct,
  slug,
  query,
  notSubcategory,
}: ProductCardFlexibleProps) => {
  const { setIsFocused } = useSearchFocus();

  const word = getSubcat(
    slug ?? [],
    SearchedProduct?.catalog,
    SearchedProduct?.subcategory,
  );

  const subcat = singularize(word || SearchedProduct?.catSubcat || '');

  const handleLink = () => {
    setIsFocused(false);
    if (query && SearchedProduct && recordViewedProduct) {
      recordViewedProduct(SearchedProduct);
    }
    setQuery?.('');
  };

  return (
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

        {/* rating */}
        <span className="mt-1 ml-2 hidden items-center text-sm sm:flex">
          <StarIcon className="mr-0.5 size-3 fill-black" />
          {SearchedProduct?.avgRating}
        </span>
      </div>

      {/* product parent catalog and subcategory */}
      {(query || notSubcategory) && (
        <p className="text-sm font-medium text-neutral-500 capitalize md:text-base">
          {subcat ?? ''}
        </p>
      )}

      <div className="flex w-full items-center justify-between sm:justify-start">
        {/* available colors */}
        <p className="text-sm font-medium text-neutral-500 md:text-base">
          {SearchedProduct?.availableColors}

          {typeof SearchedProduct?.availableColors === 'number' && (
            <span> colors</span>
          )}
        </p>

        {/* rating */}
        <span className="flex items-center text-sm sm:hidden">
          <StarIcon className="mr-0.5 size-3 fill-black" />
          {SearchedProduct?.avgRating}
        </span>
      </div>

      <p className="mt-2 font-medium md:text-base">${SearchedProduct?.price}</p>
    </div>
  );
};

export default ProductCard;
