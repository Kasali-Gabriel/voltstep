import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProductFilters } from '@/types/product';
import { ChevronDown, Star } from 'lucide-react';

export const RatingFilter =({
  filters,
  updateFilters,
  open,
  toggleSection,
}: {
  filters: ProductFilters;
  updateFilters: (
    f: Partial<ProductFilters>,
  ) => void;
  open: boolean;
  toggleSection: () => void;
}) => {
  return (
    <Collapsible open={open} onOpenChange={toggleSection}>
      <CollapsibleTrigger className="flex w-full items-center justify-between border-t border-stone-200 py-4">
        <span className="font-medium">Rating</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-b border-stone-200 pt-2 pb-10">
        <div className="space-y-2">
          <RadioGroup
            value={filters.rating ? String(filters.rating) : ''}
            onValueChange={(val) => updateFilters({ rating: Number(val) })}
            className="flex flex-col space-y-3"
          >
            {[4, 3].map((rating) => (
              <div key={rating} className="flex items-center space-x-4">
                <RadioGroupItem
                  value={String(rating)}
                  id={`rating-${rating}`}
                />
                <Label htmlFor={`rating-${rating}`} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs">& up</span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
