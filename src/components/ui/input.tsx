import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-base ring-offset-green-400 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:bg-transparent focus-visible:ring-1 focus-visible:ring-green-400 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
