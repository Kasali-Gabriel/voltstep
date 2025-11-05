import { useViewedProduct } from '@/hooks/useViewedProduct';
import { useSearchFocus } from '@/lib/state';
import { ProductCardProps } from '@/types/product';
import { getSubcat, singularize } from '@/utils/Product/getSubcat';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({
  SearchedProduct,
  setQuery,
  slug,
  query,
  notSubcategory,
  loading,
  recordViewedSearchProduct,
}: ProductCardProps) => {
  const { setIsFocused } = useSearchFocus();
  const { recordViewedProduct } = useViewedProduct();

  const word = getSubcat(
    slug ?? [],
    SearchedProduct?.catalog,
    SearchedProduct?.subcategory,
  );

  const subcat = singularize(word || SearchedProduct?.catSubcat || '');

  const fromSearch = !!query;

  const handleLink = () => {
    if (fromSearch) {
      setIsFocused(false);
    }

    if (fromSearch && SearchedProduct && recordViewedSearchProduct) {
      recordViewedSearchProduct(SearchedProduct);
    } else if (!fromSearch && SearchedProduct && recordViewedProduct) {
      recordViewedProduct(false, '', SearchedProduct);
    }

    if (setQuery) {
      setQuery('');
    }
  };

  return (
    <div
      className={`flex w-full flex-col transition-opacity duration-300 ${loading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
    >
      <Link
        href={`/product/${SearchedProduct?.slug}`}
        onClick={handleLink}
        tabIndex={SearchedProduct?.slug ? 0 : -1}
        className="relative block aspect-square w-full"
      >
        <Image
          src={SearchedProduct?.image ?? ''}
          alt="item-image"
          fill
          className="border object-contain shadow-md"
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
      {(fromSearch || notSubcategory) && (
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
