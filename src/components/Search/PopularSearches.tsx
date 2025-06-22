import type { PopularSearchesProps } from '@/types/search';
import { TrendingUp } from 'lucide-react';

const PopularSearches = ({
  text = 'Popular Search Terms',
  popularSearches,
  setQuery,
}: PopularSearchesProps) => {
  return (
    <div className="col-span-full">
      <div className="mb-4 flex gap-4 font-semibold sm:text-lg md:text-xl">
        {text}

        {text !== 'Popular Search Terms' && <TrendingUp />}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-5">
        {popularSearches.map((item) => (
          <button
            key={item.id}
            className="cursor-pointer rounded-3xl bg-neutral-200 px-3 py-1.5 text-sm font-medium hover:bg-neutral-300 md:px-5 md:text-base"
            onClick={() => setQuery(item.query)}
          >
            {item.query}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
