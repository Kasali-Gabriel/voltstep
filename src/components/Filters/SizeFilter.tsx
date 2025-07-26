import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { subcategorySizeMapping } from '@/data/sizeData';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Product } from '@/types/product';
import { SearchedProduct } from '@/types/search';
import { ChevronDown } from 'lucide-react';

const smartSizeSort = (sizes: string[]) => {
  // Remove duplicates first
  const uniqueSizes = Array.from(new Set(sizes));

  // Separate different types of sizes
  const numericSizes: { value: number; original: string }[] = [];
  const alphaSizes: string[] = [];
  const kidsSizes: string[] = [];
  const specialSizes: string[] = [];
  const shoeSizes: { value: number; original: string }[] = [];

  uniqueSizes.forEach((size) => {
    // Kids sizes (2T, 3T, etc.)
    if (/^\d+T$/.test(size)) {
      kidsSizes.push(size);
    }
    // Shoe sizes (7, 7.5, 8, etc. or with Y/C suffixes)
    else if (/^\d+(\.\d+)?[YC]?$/.test(size)) {
      const numMatch = size.match(/^(\d+(?:\.\d+)?)/);
      if (numMatch) {
        shoeSizes.push({
          value: parseFloat(numMatch[1]),
          original: size,
        });
      }
    }
    // Regular numeric sizes
    else if (/^\d+$/.test(size)) {
      const num = parseInt(size);
      // Treat larger numbers (28+) as waist sizes, smaller as regular sizes
      if (num >= 28) {
        numericSizes.push({ value: num, original: size });
      } else {
        shoeSizes.push({ value: num, original: size });
      }
    }
    // Alpha sizes (XS, S, M, L, etc.)
    else if (['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].includes(size)) {
      alphaSizes.push(size);
    }
    // Special sizes (One Size, S/M, L/XL, Small, Medium, Large)
    else {
      specialSizes.push(size);
    }
  });

  // Sort each category
  kidsSizes.sort((a, b) => {
    const aNum = parseInt(a.replace('T', ''));
    const bNum = parseInt(b.replace('T', ''));
    return aNum - bNum;
  });

  numericSizes.sort((a, b) => a.value - b.value);
  shoeSizes.sort((a, b) => a.value - b.value);

  // Define alpha size order
  const alphaOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  alphaSizes.sort((a, b) => alphaOrder.indexOf(a) - alphaOrder.indexOf(b));

  // Define special size order for common patterns
  const specialOrder = [
    'One Size',
    'Small',
    'Medium',
    'Large',
    'S/M',
    'M/L',
    'L/XL',
    'XS/S',
  ];
  specialSizes.sort((a, b) => {
    const aIndex = specialOrder.indexOf(a);
    const bIndex = specialOrder.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });

  // Combine in logical order: kids -> alpha -> numeric -> shoes -> special
  return [
    ...kidsSizes,
    ...alphaSizes,
    ...numericSizes.map((s) => s.original),
    ...shoeSizes.map((s) => s.original),
    ...specialSizes,
  ];
};

export const getSmartSizes = (
  slug?: string[],
  searchResults?: Product[] | SearchedProduct[],
) => {
  let availableSizes: string[] = [];

  // Priority 1: Use actual sizes from search results if we're in search mode
  if (searchResults && searchResults.length > 0) {
    const uniqueSizes = new Set<string>();
    searchResults.forEach((product) => {
      if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach((size: string) => uniqueSizes.add(size));
      }
    });
    availableSizes = Array.from(uniqueSizes);

    // If we found sizes from products, return them
    if (availableSizes.length > 0) {
      return smartSizeSort(availableSizes);
    }
  }

  // Priority 2: Use category-based sizes from slug
  if (slug && slug.length >= 2) {
    // Try exact subcategory match first (most specific)
    if (slug.length === 3) {
      const subcategory = slug[2];
      const exactMatch = subcategorySizeMapping[subcategory];

      if (exactMatch && exactMatch.length > 0) {
        return smartSizeSort(exactMatch);
      }

      // Try partial subcategory match
      const partialMatch = Object.entries(subcategorySizeMapping).find(
        ([subcat]) =>
          subcat.toLowerCase().includes(subcategory.toLowerCase()) ||
          subcategory.toLowerCase().includes(subcat.toLowerCase()),
      );

      if (partialMatch && partialMatch[1].length > 0) {
        return smartSizeSort(partialMatch[1]);
      }
    }

    // Try category-level match (less specific)
    if (slug.length >= 2) {
      const category = slug[1];
      const commonSizes = new Set<string>();

      Object.entries(subcategorySizeMapping).forEach(([subcat, sizes]) => {
        // More flexible matching for categories
        if (
          subcat.toLowerCase().includes(category.toLowerCase()) ||
          category.toLowerCase().includes(subcat.toLowerCase()) ||
          (category.toLowerCase() === 'men' &&
            /men|tops|shorts|joggers|shoes/i.test(subcat)) ||
          (category.toLowerCase() === 'women' &&
            /women|sports|bras|leggings|tank/i.test(subcat)) ||
          (category.toLowerCase() === 'kids' && /kids|activewear/i.test(subcat))
        ) {
          (sizes as string[]).forEach((size: string) => commonSizes.add(size));
        }
      });

      availableSizes = Array.from(commonSizes);

      if (availableSizes.length > 0) {
        return smartSizeSort(availableSizes);
      }
    }
  }

  // Priority 3: Smart defaults based on common patterns

  // If no specific sizes found, provide comprehensive defaults
  const defaultSizes = [
    // Clothing sizes
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    // Shoe sizes (common range)
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    // Kids sizes
    '2T',
    '3T',
    '4T',
    '5T',
    // Special sizes
    'One Size',
  ];

  return smartSizeSort(defaultSizes);
};

export function SizeFilter({
  availableSizes,
  filters,
  updateFilters,
  open,
  toggleSection,
}: {
  availableSizes: string[];
  filters: import('@/utils/Product/productFilters').ProductFilters;
  updateFilters: (
    f: Partial<import('@/utils/Product/productFilters').ProductFilters>,
  ) => void;
  open: boolean;
  toggleSection: () => void;
}) {
  const [isMobile] = useIsMobile(1024);

  return (
    <Collapsible open={open} onOpenChange={toggleSection}>
      <CollapsibleTrigger className="flex w-full items-center justify-between border-t border-stone-200 py-3">
        <span className="font-medium">
          Size
          {filters.sizes && filters.sizes.length > 0 && (
            <span className="ml-2">({filters.sizes.length})</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-b border-stone-200 pt-2 pb-10">
        <div
          className={`grid grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-3 lg:gap-3 sm:landscape:grid-cols-3 ${isMobile ? 'sm:landscape:grid-cols-4 sm:landscape:gap-5' : 'sm:landscape:grid-cols-3 sm:landscape:gap-3'}`}
        >
          {availableSizes.map((size) => {
            const isSelected = (filters.sizes ?? []).includes(size);
            const isNumeric = /^\d+(\.\d+)?/.test(size);
            const isKidsSize = /^\d+T$/.test(size);

            // Smart selection limits for sizes
            const totalAvailableSizes = availableSizes.length;
            let maxSelectable: number;
            if (totalAvailableSizes === 2) {
              maxSelectable = 1;
            } else if (totalAvailableSizes === 3 || totalAvailableSizes === 4) {
              maxSelectable = 2;
            } else if (totalAvailableSizes === 5) {
              maxSelectable = 3;
            } else if (totalAvailableSizes >= 6) {
              maxSelectable = 4;
            } else {
              maxSelectable = 1; // fallback for edge cases
            }
            const currentSelections = filters.sizes?.length ?? 0;
            const canSelect = isSelected || currentSelections < maxSelectable;

            return (
              <button
                key={size}
                onClick={() => {
                  if (!canSelect && !isSelected) return;

                  const currentSizes = filters.sizes ?? [];

                  // Smart selection limits for sizes
                  const totalAvailableSizes = availableSizes.length;
                  let maxSelectable: number;
                  if (totalAvailableSizes === 2) {
                    maxSelectable = 1;
                  } else if (
                    totalAvailableSizes === 3 ||
                    totalAvailableSizes === 4
                  ) {
                    maxSelectable = 2;
                  } else if (totalAvailableSizes === 5) {
                    maxSelectable = 3;
                  } else if (totalAvailableSizes === 6) {
                    maxSelectable = 4;
                  } else if (totalAvailableSizes > 6) {
                    maxSelectable = 4;
                  } else {
                    maxSelectable = 1; // fallback for edge cases
                  }

                  let newSizes: string[];

                  if (isSelected) {
                    // Remove this size from selections
                    newSizes = currentSizes.filter((s) => s !== size);
                  } else {
                    // Check if we can add more selections
                    if (currentSizes.length < maxSelectable) {
                      newSizes = [...currentSizes, size];
                    } else {
                      // Don't add if at limit
                      return;
                    }
                  }

                  updateFilters({ sizes: newSizes });
                }}
                className={`h-12 rounded-md border text-center transition-all duration-150 sm:h-14 lg:h-10 sm:landscape:h-10 ${
                  isSelected
                    ? 'cursor-pointer border-black bg-black text-white shadow-sm'
                    : canSelect
                      ? 'cursor-pointer border-stone-300 hover:border-black hover:shadow-sm'
                      : 'cursor-not-allowed border-stone-200 bg-stone-50 text-stone-400'
                } ${
                  isKidsSize
                    ? 'text-xs font-bold'
                    : isNumeric
                      ? 'text-sm font-medium'
                      : 'text-xs font-semibold'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
