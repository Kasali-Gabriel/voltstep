'use client';

import { FloatingLabelInput } from '@/components/ui/floating-input';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Autofill detection keyframes (for global style)
const autofillKeyframes = `
@keyframes onAutoFillStart {}
@keyframes onAutoFillCancel {}
input:-webkit-autofill {
  animation-name: onAutoFillStart;
}
input:not(:-webkit-autofill) {
  animation-name: onAutoFillCancel;
}
`;

interface CityInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  suggestions?: string[];
  disabled?: boolean;
  className?: string;
}

export const CityInput = ({
  form,
  name,
  label,
  suggestions = [],
  disabled = false,
  className,
}: CityInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAbove, setShowAbove] = useState(false);

  const watchedValue = form.watch(name) || '';

  // Update position when suggestions are shown
  const updatePosition = useCallback(() => {
    if (showSuggestions && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const suggestionsHeight = 256;

      // Check available space above and below
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Decide whether to show above or below
      setShowAbove(
        spaceBelow < suggestionsHeight + 12 && spaceAbove > spaceBelow,
      );
    }
  }, [showSuggestions]);

  // Update position immediately when suggestions show/hide or input changes
  useEffect(() => {
    if (showSuggestions) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [showSuggestions, updatePosition]);

  // Update position on scroll and resize
  useEffect(() => {
    if (!showSuggestions) return;

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [showSuggestions, updatePosition]);

  useEffect(() => {
    if (!watchedValue.trim() || watchedValue.length < 2) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = suggestions
      .filter((city) => {
        const cityLower = city.toLowerCase();
        const valueLower = watchedValue.toLowerCase();
        return cityLower.includes(valueLower) && cityLower !== valueLower;
      })
      .slice(0, 8);

    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [watchedValue, suggestions]);

  const handleSuggestionSelect = (suggestion: string) => {
    form.setValue(name, suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (isAutofilling) return;
    if (filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };
  // Autofill detection effect
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleAnimationStart = (e: AnimationEvent) => {
      if (e.animationName === 'onAutoFillStart') {
        setIsAutofilling(true);
        setShowSuggestions(false);
      } else if (e.animationName === 'onAutoFillCancel') {
        setIsAutofilling(false);
      }
    };

    input.addEventListener('animationstart', handleAnimationStart);
    return () => {
      input.removeEventListener('animationstart', handleAnimationStart);
    };
  }, []);

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Don't close if clicking on suggestions
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.closest('[data-suggestions-portal]')) {
      return;
    }
    setShowSuggestions(false);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest('[data-suggestions-portal]')
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSuggestions]);

  return (
    <div className={cn('relative', className)}>
      {/* Autofill detection global style */}
      <style jsx global>
        {autofillKeyframes}
      </style>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                {...field}
                ref={inputRef}
                type="text"
                label={label}
                disabled={disabled}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={cn('autofill:animation-onAutoFill')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          data-suggestions-portal
          className={cn(
            'pointer-events-auto absolute z-[99999] max-h-64 w-full rounded-md border border-gray-200 bg-white p-1 text-black shadow-lg',
            showAbove ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
          )}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="scrollbar-thin max-h-60 overflow-y-auto"
            onWheel={(e) => {
              e.stopPropagation();
            }}
            tabIndex={-1}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                tabIndex={0}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
