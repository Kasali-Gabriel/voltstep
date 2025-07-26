import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Product } from '@/types/product';
import { SearchedProduct } from '@/types/search';
import { ChevronDown } from 'lucide-react';

export const getSmartPriceRanges = (
  products: Product[] | SearchedProduct[],
) => {
  if (!products.length) return [0, 50, 100, 200, 500];

  const prices = products.map((p) => p.price).sort((a, b) => a - b);
  const min = Math.floor(prices[0]);
  const max = Math.ceil(prices[prices.length - 1]);

  // If range is small, use more granular divisions
  if (max - min <= 50) {
    return [min, Math.round(min + (max - min) * 0.5), max];
  }

  // For larger ranges, create more meaningful price buckets
  const range = max - min;
  const bucket1 = Math.round(min + range * 0.2);
  const bucket2 = Math.round(min + range * 0.4);
  const bucket3 = Math.round(min + range * 0.6);
  const bucket4 = Math.round(min + range * 0.8);

  // Round to nearest 5 for cleaner ranges
  const roundToNearest5 = (num: number) => Math.round(num / 5) * 5;

  return [
    min,
    roundToNearest5(bucket1),
    roundToNearest5(bucket2),
    roundToNearest5(bucket3),
    roundToNearest5(bucket4),
    max,
  ].filter((price, index, arr) => index === 0 || price !== arr[index - 1]);
};

export function PriceFilter({
  filters,
  updateFilters,
  open,
  toggleSection,
  priceRanges,
}: {
  filters: import('@/utils/Product/productFilters').ProductFilters;
  updateFilters: (
    f: Partial<import('@/utils/Product/productFilters').ProductFilters>,
  ) => void;
  open: boolean;
  toggleSection: () => void;
  priceRanges: number[];
}) {
  return (
    <Collapsible open={open} onOpenChange={toggleSection}>
      <CollapsibleTrigger className="flex w-full items-center justify-between border-t border-stone-200 py-4">
        <span className="font-medium">
          Price Range
          {filters.priceRanges && filters.priceRanges.length > 0 && (
            <span className="ml-2">({filters.priceRanges.length})</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-b border-stone-200 pt-2 pb-10">
        <div className="flex flex-col space-y-2">
          {priceRanges.slice(0, -1).map((price, index) => {
            const nextPrice = priceRanges[index + 1];
            let label: string;

            if (index === 0) {
              label =
                nextPrice === priceRanges[priceRanges.length - 1]
                  ? `$${price} - $${nextPrice}`
                  : `Under $${nextPrice}`;
            } else if (index === priceRanges.length - 2) {
              label = `$${price} & above`;
            } else {
              label = `$${price} - $${nextPrice}`;
            }

            // Check if this specific range is selected
            const isRangeSelected = (filters.priceRanges ?? []).some(
              ([min, max]) => min === price && max === nextPrice,
            );

            // Smart selection limits for price ranges
            const totalAvailableRanges = priceRanges.length - 1;
            let maxSelectable: number;
            if (totalAvailableRanges === 2) {
              maxSelectable = 1;
            } else if (
              totalAvailableRanges === 3 ||
              totalAvailableRanges === 4
            ) {
              maxSelectable = 2;
            } else {
              maxSelectable = 3; // 5+ options max 3 selectable
            }
            const currentSelections = filters.priceRanges?.length ?? 0;
            const canSelect =
              isRangeSelected || currentSelections < maxSelectable;

            return (
              <label
                key={`${price}-${nextPrice}`}
                className={`flex cursor-pointer items-center space-x-4 rounded-md p-2 transition-colors ${
                  !canSelect && !isRangeSelected
                    ? 'cursor-not-allowed opacity-50'
                    : ''
                }`}
              >
                <Checkbox
                  checked={isRangeSelected}
                  disabled={!canSelect && !isRangeSelected}
                  onCheckedChange={(checked) => {
                    const currentRanges = filters.priceRanges ?? [];
                    let newRanges: Array<[number, number]>;

                    // Smart selection limits for price ranges
                    const totalAvailableRanges = priceRanges.length - 1;
                    let maxSelectable: number;
                    if (totalAvailableRanges === 2) {
                      maxSelectable = 1;
                    } else if (
                      totalAvailableRanges === 3 ||
                      totalAvailableRanges === 4
                    ) {
                      maxSelectable = 2;
                    } else {
                      maxSelectable = 3; // 5+ options max 3 selectable
                    }

                    if (checked) {
                      // Check if we can add more selections
                      if (currentRanges.length < maxSelectable) {
                        newRanges = [...currentRanges, [price, nextPrice]];
                      } else {
                        // Don't add if at limit
                        return;
                      }
                    } else {
                      // Remove this range from selections
                      newRanges = currentRanges.filter(
                        ([min, max]) => !(min === price && max === nextPrice),
                      );
                    }

                    updateFilters({ priceRanges: newRanges });
                  }}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
