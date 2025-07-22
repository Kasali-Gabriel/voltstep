import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { colorHexCodes } from '@/data/colorData';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Product } from '@/types/product';
import { SearchedProduct } from '@/types/search';
import { Check, ChevronDown } from 'lucide-react';

export const getTopColors = (products?: Product[] | SearchedProduct[]) => {
  // If we have products, analyze their actual colors
  if (products && products.length > 0) {
    const colorFrequency: Record<string, number> = {};

    products.forEach((product) => {
      if (product.colors) {
        product.colors.forEach((color: string) => {
          colorFrequency[color] = (colorFrequency[color] || 0) + 1;
        });
      }
    });

    // Sort colors by frequency and take top ones
    const sortedColors = Object.entries(colorFrequency)
      .sort(([, a], [, b]) => b - a)
      .map(([color]) => color);

    // Always include basic colors even if not in products
    const basicColors = ['Black', 'White', 'Grey', 'Navy', 'Blue', 'Red'];
    const uniqueColors = new Set([...basicColors, ...sortedColors]);

    return Array.from(uniqueColors).slice(0, 12);
  }

  // Fallback to default popular colors
  return [
    'Black',
    'White',
    'Grey',
    'Navy',
    'Blue',
    'Red',
    'Green',
    'Pink',
    'Purple',
    'Brown',
    'Orange',
    'Yellow',
  ];
};

export function ColorFilter({
  topColors,
  filters,
  updateFilters,
  open,
  toggleSection,
}: {
  topColors: string[];
  filters: import('@/utils/productFilters').ProductFilters;
  updateFilters: (
    f: Partial<import('@/utils/productFilters').ProductFilters>,
  ) => void;
  open: boolean;
  toggleSection: () => void;
}) {
  // Only show colors that have hex codes defined
  const availableColors = topColors.filter(
    (color) => colorHexCodes[color as keyof typeof colorHexCodes],
  );

  const [isMobile] = useIsMobile(1024);

  return availableColors.length > 0 ? (
    <Collapsible open={open} onOpenChange={toggleSection}>
      <CollapsibleTrigger className="flex w-full items-center justify-between border-t border-stone-200 py-4">
        <span className="font-medium">
          Color
          {filters.colors && filters.colors.length > 0 && (
            <span className="ml-2">({filters.colors.length})</span>
          )}
        </span>

        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-b border-stone-200 pt-2 pb-10">
        <div
          className={`grid gap-5 grid-cols-3 sm:grid-cols-5 sm:gap-8 lg:grid-cols-3 lg:gap-3 sm:landscape:gap-5 ${isMobile ? 'sm:landscape:grid-cols-5' : 'sm:landscape:grid-cols-3'}`}
        >
          {availableColors.map((color) => {
            const isSelected = (filters.colors ?? []).includes(color);
            const currentSelections = filters.colors?.length ?? 0;

            // Smart selection limits for colors
            const totalAvailableColors = availableColors.length;
            let maxSelectable: number;
            if (totalAvailableColors === 2) {
              maxSelectable = 1;
            } else if (
              totalAvailableColors === 3 ||
              totalAvailableColors === 4
            ) {
              maxSelectable = 2;
            } else if (totalAvailableColors === 5) {
              maxSelectable = 3;
            } else if (totalAvailableColors === 6) {
              maxSelectable = 4;
            } else if (totalAvailableColors > 6) {
              maxSelectable = 5;
            } else {
              maxSelectable = 1; // fallback for edge cases
            }

            const canSelect = isSelected || currentSelections < maxSelectable;

            return (
              <div key={color} className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (!canSelect && !isSelected) return;

                    const currentColors = filters.colors ?? [];
                    let newColors: string[];

                    if (isSelected) {
                      // Remove this color from selections
                      newColors = currentColors.filter((c) => c !== color);
                    } else {
                      // Check if we can add more selections
                      if (currentColors.length < maxSelectable) {
                        newColors = [...currentColors, color];
                      } else {
                        // Don't add if at limit
                        return;
                      }
                    }

                    updateFilters({ colors: newColors });
                  }}
                  className={`relative size-14 rounded-full border-2 transition-all duration-200 sm:size-18 lg:size-10 sm:landscape:size-12 ${
                    isSelected
                      ? 'scale-110 border-gray-300 shadow-md'
                      : canSelect
                        ? 'border-gray-300 hover:border-gray-500'
                        : 'cursor-not-allowed border-gray-200 opacity-50'
                  }`}
                  style={{
                    backgroundColor:
                      colorHexCodes[color as keyof typeof colorHexCodes],
                  }}
                  title={color}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check
                        className={`h-6 w-6 stroke-[3] font-bold ${
                          // Use white for dark colors, black for light colors
                          [
                            'White',
                            'Light Gray',
                            'Yellow',
                            'Pink',
                            'Orange',
                            'Light Blue',
                            'Beige',
                            'Cream',
                          ].includes(color)
                            ? 'text-black'
                            : 'text-white'
                        }`}
                      />
                    </div>
                  )}
                </button>
                <span
                  className={`mt-1 text-center text-xs leading-tight ${
                    canSelect ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {color}
                </span>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  ) : null;
}
