'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useSideBarStore } from '@/lib/state';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

const Filters = () => {
  const { showFilters, setShowFilters } = useSideBarStore();

  const [isMobile] = useIsMobile(1024);

  const FilterProducts = () => {
    return <div></div>;
  };

  return (
    <aside className="relative flex">
      <AnimatePresence>
        {showFilters &&
          (isMobile ? (
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetContent
                className="h-screen p-2 duration-300 sm:p-4"
                side="bottom"
              >
                <SheetHeader className="relative flex">
                  <SheetTitle className="text-lg font-medium">
                    Filters
                  </SheetTitle>

                  <VisuallyHidden>
                    <SheetDescription></SheetDescription>
                  </VisuallyHidden>

                  <SheetClose className="absolute top-3 right-2 bg-neutral-200 rounded-full p-2">
                    <X
                      className="size-6 cursor-pointer"
                      size={15}
                      strokeWidth={2}
                    />
                  </SheetClose>
                </SheetHeader>

                <FilterProducts />
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute top-0 left-0 z-40 flex h-full w-72 flex-1 flex-col bg-black"
              >
                <div className="pl-10 xl:pl-12">
                  <p className="text-xl text-white">my name is gab</p>
                </div>
                <FilterProducts />
              </motion.div>
            </>
          ))}
      </AnimatePresence>
    </aside>
  );
};

export default Filters;
