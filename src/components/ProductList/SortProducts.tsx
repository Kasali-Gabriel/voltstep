'use client';

import { useSortProducts } from '@/hooks/useSortProducts';
import { SortProductsProps } from '@/types/product';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { SortOption } from '@/utils/sortProducts';
import { useState } from 'react';

const SortProducts = ({
  isMobile,
  isSearchResults = false,
  loading = false,
}: SortProductsProps) => {
  const { setSortBy, getSortBy, getOptions } = useSortProducts(isSearchResults);

  const currentSort = getSortBy();
  const availableOptions = getOptions();
  const [hasSelected, setHasSelected] = useState(false);

  return isMobile ? (
    <div className="mb-4">
      <h3 className="mb-4 text-lg font-medium">Sort By</h3>

      <RadioGroup
        defaultValue={currentSort}
        onValueChange={setSortBy}
        disabled={loading}
      >
        {availableOptions.map((option) => (
          <div key={option.value} className="mb-2 flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              disabled={loading}
            />

            <Label
              htmlFor={option.value}
              className={`text-base ${loading ? 'opacity-50' : ''}`}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  ) : (
    <Select
      onValueChange={(value) => {
        setHasSelected(true);
        setSortBy(value as SortOption);
      }}
      defaultValue={currentSort}
      disabled={loading}
    >
      <SelectTrigger
        className={`w-auto cursor-pointer border-0 p-0 pt-0.5 text-base font-medium shadow-none hover:shadow-none focus-visible:border-0 focus-visible:ring-0 data-[placeholder]:text-black data-[size=default]:h-auto data-[size=sm]:h-auto ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        iconClassName="size-6 text-black mt-1"
        disabled={loading}
      >
        <SelectValue placeholder="Sort By">
          {/* Show 'Sort By' on load, and after any user selection, show 'Sort by: [label]' */}
          {hasSelected
            ? `Sort by: ${availableOptions.find((option) => option.value === currentSort)?.label}`
            : 'Sort By'}
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        align="end"
        position="popper"
        alignOffset={-28}
        className="rounded-none rounded-bl-3xl border-0 pt-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
      >
        {availableOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer justify-end text-base font-medium text-black focus:bg-transparent focus:text-neutral-500"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortProducts;
