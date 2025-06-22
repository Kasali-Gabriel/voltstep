'use client';
import { useSearchFocus } from '@/lib/state';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

const SearchBar = () => {
  const { setIsFocused } = useSearchFocus();
  return (
    <div className="relative items-center justify-center md:-ml-10">
      <Search
        size={20}
        strokeWidth={2}
        className="absolute top-1/2 left-3 size-5 -translate-y-1/2 transform text-neutral-600"
      />
      <Input
        type="search"
        placeholder="What are you looking for today?"
        className="z-30 h-12 w-full rounded-4xl border-2 bg-neutral-100 pl-10 placeholder:text-neutral-500 md:h-10 md:w-[19.5rem] md:bg-transparent lg:w-[22rem]"
        onFocus={() => setIsFocused(true)}
      />
    </div>
  );
};

export default SearchBar;
