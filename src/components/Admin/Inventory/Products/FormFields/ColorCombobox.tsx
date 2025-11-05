'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { colorHexCodes } from '@/data/colorData';
import { cn } from '@/lib/utils';

interface ColorComboboxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  availableColors: string[];
}

export function ColorCombobox({
  value,
  onChange,
  disabled,
  availableColors,
}: ColorComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const colors = availableColors.map((color) => ({
    value: color,
    label: color,
    hex: colorHexCodes[color as keyof typeof colorHexCodes] || '#000000',
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {value ? (
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  backgroundColor:
                    colorHexCodes[value as keyof typeof colorHexCodes] ||
                    '#000000',
                }}
              />
              {value}
            </div>
          ) : (
            'Select color...'
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search color..." className="h-9" />
          <CommandList>
            <CommandEmpty>No color found.</CommandEmpty>
            <CommandGroup>
              {colors.map((color) => (
                <CommandItem
                  key={color.value}
                  value={color.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.label}
                  </div>
                  <Check
                    className={cn(
                      'ml-auto',
                      value === color.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
