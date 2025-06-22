import { SearchHistoryProps } from '@/types/search';
import ProductCard from '../Product/ProductCard';

const SearchHistory = ({
  setQuery,
  recentSearches,
  recentViewed,
  loading,
  recordViewedProduct,
}: SearchHistoryProps) => {
  return (
    <div className="mt-5 flex flex-col space-y-10 overflow-x-hidden">
      {recentSearches.length > 0 && (
        <div className="flex flex-col items-end space-y-2">
          <h3 className="mb-4 font-semibold sm:text-lg md:text-xl">
            Your Recent Searches
          </h3>

          <div className="flex flex-wrap gap-4 md:gap-x-5">
            {recentSearches.map((item) => (
              <button
                key={item.id}
                className="cursor-pointer rounded-3xl bg-neutral-200 px-3 py-1.5 text-sm font-medium hover:bg-neutral-300 md:px-5 md:text-base"
                onClick={() => setQuery && setQuery(item.query)}
              >
                {item.query}
              </button>
            ))}
          </div>
        </div>
      )}

      {recentViewed.length > 0 && (
        <div className="flex max-w-screen flex-col">
          <h2 className="mb-4 font-semibold text-black sm:text-lg md:text-xl">
            Recently Viewed from Search
          </h2>

          <div className="flex w-full flex-row gap-4 overflow-x-auto pb-2">
            {recentViewed.map((item) => (
              <div key={item.id} className="w-44 flex-shrink-0 sm:w-48 md:w-56">
                <ProductCard
                  loading={loading}
                  SearchedProduct={item}
                  setQuery={setQuery}
                  recordViewedProduct={recordViewedProduct}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
