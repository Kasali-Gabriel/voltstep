import { SearchHistoryProps } from '@/types/search';
import RecentlyViewedProducts from '../ProductList/RecentlyViewedProducts';

const SearchHistory = ({
  setQuery,
  recentSearches,
  recentViewed,
  loading,
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

      <RecentlyViewedProducts
        recentViewed={recentViewed}
        loading={loading}
        isSearchResults={true}
      />
    </div>
  );
};

export default SearchHistory;
