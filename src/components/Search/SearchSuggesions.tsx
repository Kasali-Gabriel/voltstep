import { SuggestionItem } from '@/types/search';

const SearchSuggesions = ({
  suggestions,
}: {
  suggestions: SuggestionItem[];
}) => {
  return (
    <div className="flex flex-col space-y-2 md:space-y-3 xl:space-y-5">
      {suggestions.map((item: SuggestionItem) => (
        <p
          key={item.id}
          className="cursor-pointer capitalize text-sm font-medium text-gray-500 hover:text-black md:text-base"
          onClick={() => {}}
        >
          {item.query}
        </p>
      ))}
    </div>
  );
};

export default SearchSuggesions;
