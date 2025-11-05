'use client';

import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { countries } from '@/data/countriesData';
import { cn } from '@/lib/utils';
import { Country } from '@/types/address';
import { Label } from '../../ui/label';

export interface ComboboxOption {
  label: string;
  value: string;
}

interface ComboboxFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
  container?: HTMLElement;
}

export function ComboboxFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  options,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No option found.',
  disabled = false,
  className,
  onValueChange,
}: ComboboxFormFieldProps<TFieldValues, TName>) {
  const [open, setOpen] = React.useState(false);
  const buttonId = React.useId();

  const handleAutofillChange = React.useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      field: { onChange: (value: string) => void; name: string; value: string },
    ) => {
      const value = e.target.value;

      // For country fields, try to match against ISO codes first, then names
      if (name.includes('country')) {
        // First try to find by ISO code (for browser autofill)
        const matchingOptionByIso = options.find((option) => {
          const country = countries.find(
            (c: Country) => c.name === option.value,
          );
          return country && country.iso2.toLowerCase() === value.toLowerCase();
        });

        if (matchingOptionByIso) {
          field.onChange(matchingOptionByIso.value);
          onValueChange?.(matchingOptionByIso.value);
          setOpen(false); // Close popover after autofill
          return;
        }
      }

      // Try to find a matching option for autofilled value (by label or value)
      const matchingOption = options.find(
        (option) =>
          option.label.toLowerCase() === value.toLowerCase() ||
          option.value.toLowerCase() === value.toLowerCase(),
      );

      if (matchingOption) {
        field.onChange(matchingOption.value);
        onValueChange?.(matchingOption.value);
        setOpen(false); // Close popover after autofill
      }
      // If no exact match, don't set anything - just close the popover
      setOpen(false);
    },
    [name, options, onValueChange],
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn('flex flex-col', className)}>
            {/* Hidden native input for browser autofill */}
            <input
              type="text"
              name={field.name}
              autoComplete={
                name.includes('country')
                  ? 'country'
                  : name.includes('state')
                    ? 'address-level1'
                    : undefined
              }
              value={field.value || ''}
              onChange={(e) => handleAutofillChange(e, field)}
              style={{
                position: 'absolute',
                opacity: 0,
                height: 0,
                width: 0,
                pointerEvents: 'none',
                zIndex: -1,
              }}
              tabIndex={-1}
            />

            <div className="relative">
              <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id={buttonId}
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      disabled={disabled}
                      className={cn(
                        'peer h-10 w-full justify-between border-neutral-300 bg-white text-left font-normal hover:bg-white sm:h-12',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <span className="truncate">
                        {field.value
                          ? options.find(
                              (option) => option.value === field.value,
                            )?.label || field.value
                          : placeholder}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                {field.value && (
                  <Label
                    htmlFor={buttonId}
                    className={cn(
                      'absolute start-2 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-pointer bg-white px-2 text-sm font-normal text-gray-500 duration-300 sm:text-lg',
                    )}
                  >
                    {placeholder}
                  </Label>
                )}
                <PopoverContent
                  className="z-[60] my-1.5 w-[var(--radix-popover-trigger-width)] p-0"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                      <CommandEmpty>{emptyText}</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            className="cursor-pointer data-[selected=true]:bg-neutral-100"
                            onSelect={(value) => {
                              field.onChange(value);
                              onValueChange?.(value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                option.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
