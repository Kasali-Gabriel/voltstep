import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ReviewFiltersProps } from '@/types/auth';
import { ArrowUpDown, FunnelIcon, Star, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function ReviewFilters({
  rating,
  setRating,
  verifiedOnly,
  setVerifiedOnly,
  sortOrder,
  setSortOrder,
}: ReviewFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex cursor-pointer rounded-md border border-stone-300 bg-white px-4 py-2 leading-snug shadow-sm hover:bg-neutral-100">
            <FunnelIcon className="mr-2 h-4 w-4" />
            Filters
          </button>
        </PopoverTrigger>

        <PopoverContent
          collisionPadding={10}
          avoidCollisions
          className="w-[220px] space-y-10"
        >
          <div className="space-y-4">
            <Label className="font-semibold">Rating</Label>

            <RadioGroup
              value={rating}
              onValueChange={setRating}
              className="space-y-1 text-black"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <div key={r} className="flex items-center space-x-3">
                  <RadioGroupItem value={r.toString()} id={`rating-${r}`} />
                  <Label
                    htmlFor={`rating-${r}`}
                    className="flex items-center gap-2"
                  >
                    <span className="flex gap-0.5">
                      {r}
                      <Star className="fill-black text-black" size={14} />
                    </span>

                    <span>only</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={verifiedOnly}
              onCheckedChange={(val) => setVerifiedOnly(Boolean(val))}
            />

            <Label htmlFor="verified">Verified buyers only</Label>
          </div>
        </PopoverContent>
      </Popover>

      <div className="hidden sm:block">
        <SelectedFilters
          rating={rating}
          setRating={setRating}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}
        />
      </div>

      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[10rem]">
          <ArrowUpDown className="h-4 w-4" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="newest">Most recent</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectedFilters({
  rating,
  setRating,
  verifiedOnly,
  setVerifiedOnly,
}: {
  rating: string;
  setRating: (r: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
}) {
  if (!rating && !verifiedOnly) return null;
  return (
    <div className="flex items-center gap-2">
      {rating && (
        <span className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-sm">
          {rating === '1' ? '1 star' : `${rating} stars`}
          <button
            className="mt-0.5 ml-2 cursor-pointer text-neutral-600 hover:text-red-500 focus:outline-none"
            aria-label="Remove rating filter"
            onClick={() => setRating('')}
            type="button"
          >
            <X size={14} />
          </button>
        </span>
      )}
      {verifiedOnly && (
        <span className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-sm">
          Verified purchases
          <button
            className="mt-0.5 ml-2 text-neutral-600 hover:text-red-500 focus:outline-none"
            aria-label="Remove verified filter"
            onClick={() => setVerifiedOnly(false)}
            type="button"
          >
            <X size={14} />
          </button>
        </span>
      )}
    </div>
  );
}
