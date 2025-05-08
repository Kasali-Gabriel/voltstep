'use client';

import { ChevronLeft, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export const SearchBar = () => {
  const [placeholder, setPlaceholder] = useState('Search');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 768) {
        setPlaceholder('What are you looking for today?');
      } else {
        setPlaceholder('Search');
      }
    };

    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, []);

  return (
    <div className="relative items-center justify-center md:-ml-10">
      <Search
        size={20}
        strokeWidth={1}
        className="absolute top-1/2 left-3 h-7 w-7 -translate-y-1/2 transform font-bold md:h-5 md:w-5 md:font-normal md:text-stone-400"
      />

      <Input
        type="search"
        placeholder={placeholder}
        className={`z-30 h-12 w-full border-2 bg-neutral-100 pl-12 md:h-10 md:w-[19.5rem] md:bg-transparent md:pl-9 lg:w-[22rem] ${
          isFocused
            ? 'rounded-t-lg lg:rounded-t-2xl'
            : 'rounded md:rounded-lg lg:rounded-2xl'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {isFocused && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black/30 md:top-32 xl:top-16"
            onClick={() => setIsFocused(false)}
          ></div>

          <div className="absolute top-full left-0 z-30 min-h-[40vh] w-full rounded-b-lg border bg-white shadow-md md:w-[19.5rem] lg:w-[22rem]"></div>
        </>
      )}
    </div>
  );
};

export const SearchView = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Search
          size={20}
          strokeWidth={1.25}
          className="h-6 w-6 cursor-pointer"
        />
      </SheetTrigger>

      <SheetContent
        side="top"
        className="data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left h-full w-full"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <div className="flex h-full w-full flex-col space-y-4 py-4 pr-2">
          <div className="flex w-full space-x-2">
            <SheetClose tabIndex={-1}>
              <ChevronLeft
                className="h-12 w-12 cursor-pointer"
                size={20}
                strokeWidth={1}
              />
            </SheetClose>

            <div className="relative w-full">
              <Search
                size={20}
                strokeWidth={1}
                className="absolute top-1/2 left-3 h-7 w-7 -translate-y-1/2 transform font-bold"
              />

              <Input
                type="search"
                placeholder="What are you looking for today?"
                className="h-12 w-full rounded-md border-2 bg-neutral-100 pl-12"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
