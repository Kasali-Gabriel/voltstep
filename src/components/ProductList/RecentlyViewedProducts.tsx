import { SearchedProduct } from '@/types/search';
import ProductCard from '../Product/ProductCard';

const RecentlyViewedProducts = ({
  recentViewed,
  loading,
  isSearchResults = false,
  noPadding = false,
}: {
  recentViewed: SearchedProduct[];
  loading?: boolean;
  isSearchResults?: boolean;
  noPadding?: boolean;
}) => {
  return (
    <div
      className={`mt-10 flex max-w-full ${isSearchResults || noPadding ? '' : 'px-2 md:px-5'} `}
    >
      {recentViewed.length > 0 && (
        <div className="flex w-full flex-col items-start">
          <h2 className="mb-4 font-semibold text-black sm:text-lg md:text-xl">
            {isSearchResults
              ? 'Recently Viewed from Search'
              : 'Recently Viewed Products'}
          </h2>

          <div className="mt-3 flex w-full flex-row gap-5 overflow-x-auto pb-4">
            {recentViewed.map((item) => (
              <div key={item.id} className="w-44 flex-shrink-0 sm:w-48 md:w-56">
                <ProductCard loading={loading} SearchedProduct={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewedProducts;
