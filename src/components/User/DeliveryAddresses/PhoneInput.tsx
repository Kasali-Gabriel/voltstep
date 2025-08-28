import { FloatingLabelInput } from '@/components/ui/floating-input';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { countries} from '@/data/countriesData';
import { cn } from '@/lib/utils';
import { Country } from '@/types/address';
import * as FlagIconsRaw from 'country-flag-icons/react/3x2';
import React, { useMemo, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

const FlagIcons = FlagIconsRaw as Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
>;

interface PhoneInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  countryName: string;
  disabled?: boolean;
  label?: string;
  className?: string;
}

// Helper to get country data by name
function getCountryData(countryName: string): Country | undefined {
  return countries.find((c) => c.name === countryName);
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  form,
  name,
  countryName,
  disabled,
  label = 'Phone Number',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const country = useMemo(() => getCountryData(countryName), [countryName]);
  const phoneCode = country?.phone?.code || '';
  const iso2 = country?.iso2 ? country.iso2.toUpperCase() : '';
  const FlagIcon =
    iso2 &&
    (FlagIcons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[iso2]
      ? (FlagIcons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[
          iso2
        ]
      : null;

  // Let user type the phone code themselves; show value as is
  const value = form.watch(name) || '';

  // Remove programmatic select to avoid interfering with browser autofill
  const handleInputFocus = () => {};
  const handleInputBlur = () => {};

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              {FlagIcon && (
                <div className="pointer-events-none absolute top-1/2 left-3 z-10 flex -translate-y-1/2 items-center select-none">
                  <FlagIcon className="mr-1 h-4 w-6" />

                  <span className="mx-1">|</span>
                </div>
              )}

              <FloatingLabelInput
                {...field}
                ref={inputRef}
                type="tel"
                label={label}
                disabled={disabled}
                placeholder={phoneCode}
                autoComplete="tel"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={cn('autofill:animation-onAutoFill pl-14', className)}
                value={value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
