import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tag } from '@/types/product';
import { ChevronDown } from 'lucide-react';

export function TagsFilter({
  filters,
  updateFilters,
  open,
  toggleSection,
}: {
  filters: import('@/utils/Product/productFilters').ProductFilters;
  updateFilters: (
    f: Partial<import('@/utils/Product/productFilters').ProductFilters>,
  ) => void;
  open: boolean;
  toggleSection: () => void;
}) {
  return (
    <Collapsible open={open} onOpenChange={toggleSection}>
      <CollapsibleTrigger className="flex w-full items-center justify-between border-t border-stone-200 py-4">
        <span className="font-medium">
          Tags
          {filters.tags && filters.tags.length > 0 && (
            <span className="ml-2">({filters.tags.length})</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-b border-stone-200 pt-2 pb-10">
        <div className="flex flex-col space-y-5">
          {Object.values(Tag).map((tag) => (
            <label
              key={tag}
              className="flex cursor-pointer items-center space-x-4"
            >
              <Checkbox
                checked={(filters.tags ?? []).includes(tag)}
                onCheckedChange={(checked) => {
                  const newTags = checked
                    ? [...(filters.tags ?? []), tag]
                    : (filters.tags ?? []).filter((t) => t !== tag);
                  updateFilters({ tags: newTags });
                }}
              />

              <span className="font-medium capitalize">
                {tag.replace('_', ' ').toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
