import SliderIcon from '@/assets/sliders-simple-svgrepo-com.svg';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowUpDown, X } from 'lucide-react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface OrdersFiltersProps {
  status: string;
  setStatus: (s: string) => void;
  dateRange: string;
  setDateRange: (d: string) => void;
  minAmount: number;
  maxAmount: number;
  setMinAmount: (m: number) => void;
  setMaxAmount: (m: number) => void;
  sortOrder: string;
  setSortOrder: (s: string) => void;
}

const orderStatuses: { value: string; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUNDED', label: 'Refunded' },
];

const dateRanges: { value: string; label: string }[] = [
  { value: '', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'thisyear', label: 'This Year' },
];

export function OrdersFilters({
  status,
  setStatus,
  dateRange,
  setDateRange,
  minAmount,
  maxAmount,
  setMinAmount,
  setMaxAmount,
  sortOrder,
  setSortOrder,
}: OrdersFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex cursor-pointer rounded-md border border-stone-300 bg-white px-4 py-1 text-base leading-snug shadow-sm hover:bg-neutral-100">
            <Image
              src={SliderIcon}
              alt="filter icon"
              height={24}
              className="mr-2"
            />
            Filters
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          collisionPadding={10}
          avoidCollisions
          className="w-[280px] p-4 pr-2"
        >
          <div className="scrollbar-thin h-96 space-y-6 overflow-y-auto pr-2">
            <div className="space-y-4">
              <Label className="font-semibold">Order Status</Label>
              <RadioGroup
                value={status}
                onValueChange={setStatus}
                className="space-y-2 text-black"
              >
                {orderStatuses.map((statusOption) => (
                  <div
                    key={statusOption.value}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem
                      value={statusOption.value}
                      id={`status-${statusOption.value}`}
                    />
                    <Label
                      htmlFor={`status-${statusOption.value}`}
                      className="text-sm"
                    >
                      {statusOption.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="font-semibold">Date Range</Label>
              <RadioGroup
                value={dateRange}
                onValueChange={setDateRange}
                className="space-y-2 text-black"
              >
                {dateRanges.map((range) => (
                  <div
                    key={range.value}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem
                      value={range.value}
                      id={`date-${range.value}`}
                    />
                    <Label htmlFor={`date-${range.value}`} className="text-sm">
                      {range.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="font-semibold">Total Amount Range</Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>${minAmount}</span>
                  <span>${maxAmount}</span>
                </div>
                <Slider
                  value={[minAmount, maxAmount]}
                  onValueChange={([min, max]) => {
                    setMinAmount(min);
                    setMaxAmount(max);
                  }}
                  min={0}
                  max={1000}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="hidden sm:block">
        <SelectedOrdersFilters
          status={status}
          setStatus={setStatus}
          dateRange={dateRange}
          setDateRange={setDateRange}
          minAmount={minAmount}
          maxAmount={maxAmount}
          setMinAmount={setMinAmount}
          setMaxAmount={setMaxAmount}
        />
      </div>

      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-auto cursor-pointer">
          <ArrowUpDown className="h-4 w-4" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="newest">Most recent</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="highest">Highest Order</SelectItem>
          <SelectItem value="lowest">Lowest Order</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectedOrdersFilters({
  status,
  setStatus,
  dateRange,
  setDateRange,
  minAmount,
  maxAmount,
  setMinAmount,
  setMaxAmount,
}: {
  status: string;
  setStatus: (s: string) => void;
  dateRange: string;
  setDateRange: (d: string) => void;
  minAmount: number;
  maxAmount: number;
  setMinAmount: (m: number) => void;
  setMaxAmount: (m: number) => void;
}) {
  const hasFilters = status || dateRange || minAmount > 0 || maxAmount < 1000;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status && (
        <span className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-sm">
          {orderStatuses.find((s) => s.value === status)?.label || status}
          <button
            className="mt-0.5 ml-2 cursor-pointer text-neutral-600 hover:text-red-500 focus:outline-none"
            aria-label="Remove status filter"
            onClick={() => setStatus('')}
            type="button"
          >
            <X size={14} />
          </button>
        </span>
      )}
      {dateRange && (
        <span className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-sm">
          {dateRanges.find((d) => d.value === dateRange)?.label || dateRange}
          <button
            className="mt-0.5 ml-2 cursor-pointer text-neutral-600 hover:text-red-500 focus:outline-none"
            aria-label="Remove date filter"
            onClick={() => setDateRange('')}
            type="button"
          >
            <X size={14} />
          </button>
        </span>
      )}
      {(minAmount > 0 || maxAmount < 1000) && (
        <span className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-sm">
          ${minAmount} - ${maxAmount}
          <button
            className="mt-0.5 ml-2 cursor-pointer text-neutral-600 hover:text-red-500 focus:outline-none"
            aria-label="Remove amount filter"
            onClick={() => {
              setMinAmount(0);
              setMaxAmount(1000);
            }}
            type="button"
          >
            <X size={14} />
          </button>
        </span>
      )}
    </div>
  );
}
