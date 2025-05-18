import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Heart } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const AddToWishList = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-4xl border border-black py-3 text-black hover:bg-stone-200 sm:w-fit sm:rounded-xl sm:px-12 md:py-4 lg:px-8">
            <span className="sm:hidden">Add to Wishlist</span>
            <Heart />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="px-4 py-1 text-base font-semibold">Add to Wishlist</p>{' '}
          <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const MoveToWishList = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex cursor-pointer items-center justify-center rounded-full border bg-white p-2 transition hover:bg-neutral-200">
            <Heart size={20} strokeWidth={1} />
          </button>
        </TooltipTrigger>

        <TooltipContent collisionPadding={10} avoidCollisions={true}>
          <p className="px-2 py-1 text-sm font-semibold">Move to Wishlist</p>{' '}
          <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
