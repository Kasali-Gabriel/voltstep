import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export function AvailabilityFilter({
  filters,
  updateFilters,
  open,
  toggleSection,
}: {
  filters: import('@/utils/productFilters').ProductFilters;
  updateFilters: (
    f: Partial<import('@/utils/productFilters').ProductFilters>,
  ) => void;
  open: boolean;
  toggleSection: () => void;
}) {
  return (
    <Collapsible open={open} onOpenChange={toggleSection}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-4">
        <span className="font-medium">Availability</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-b border-stone-200 pb-10">
        <div className="flex cursor-pointer items-center space-x-4">
          <Checkbox
            checked={!!filters.inStock}
            onCheckedChange={(checked) => updateFilters({ inStock: !!checked })}
          />

          <span className="font-medium">In Stock Only</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
