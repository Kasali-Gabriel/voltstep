'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Catalog, Category, Subcategory } from '@/types/product';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { ViewWishlist } from '../Wishlist/ViewWishlist';

const MobileMenu = ({ catalogs }: { catalogs: Catalog[] }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger className="cursor-pointer">
        <Menu size={30} strokeWidth={1.25} />
      </SheetTrigger>

      <SheetContent side="left" className="h-full w-full">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </VisuallyHidden>

          <div className="flex w-full items-center justify-between px-4 pt-4">
            <ViewWishlist setSheetOpen={setSheetOpen} />

            <SheetClose>
              <X
                className="h-10 w-10 cursor-pointer"
                size={20}
                strokeWidth={1}
              />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex h-full flex-col space-y-4">
          <h1 className="px-4 text-xl font-semibold">SHOP</h1>

          <Tabs
            defaultValue={String(catalogs[0]?.id)}
            className="scrollbar scrollbar-thumb-stone-400 scrollbar-thumb-rounded-full scrollbar-w-[5px] h-full overflow-y-auto"
          >
            <TabsList className="flex w-full items-center justify-center space-x-10 rounded-none bg-gradient-to-b from-neutral-200 via-neutral-100 to-white pt-2">
              {catalogs.map((catalog) => (
                <TabsTrigger
                  key={catalog.id}
                  value={String(catalog.id)}
                  className="cursor-pointer border-b-1 border-transparent px-1 pt-2 pb-1.5 font-semibold text-black uppercase data-[state=active]:border-b-[2.5px] data-[state=active]:border-black"
                >
                  {catalog.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {catalogs.map((catalog: Catalog) => (
              <TabsContent
                key={catalog.id}
                value={String(catalog.id)}
                className="flex h-full w-full flex-col space-y-4 px-4"
              >
                <Link
                  href={`/products/${catalog.slug}`}
                  key={catalog.id}
                  onClick={() => setSheetOpen(false)}
                >
                  <Image
                    key={catalog.id}
                    alt={catalog.name}
                    src={''}
                    height={50}
                    width={100}
                  />
                </Link>

                {catalog.categories.map((category: Category) => (
                  <Collapsible
                    key={category.id}
                    open={open === category.id}
                    onOpenChange={(isOpen) =>
                      setOpen(isOpen ? category.id : null)
                    }
                    className="w-full border-b border-stone-300 last:border-none last:pb-10"
                  >
                    <CollapsibleTrigger className="flex h-16 w-full cursor-pointer items-center justify-between font-semibold uppercase">
                      {category.name}

                      {open === category.id ? (
                        <ChevronUp size={20} strokeWidth={1} />
                      ) : (
                        <ChevronDown size={20} strokeWidth={1} />
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pb-2">
                      <div className="flex cursor-pointer flex-col pl-2">
                        {category.subcategories?.map(
                          (subcategory: Subcategory) => (
                            <Link
                              className="cursor-pointer border-b border-stone-300 py-5 text-sm font-semibold text-stone-500 last:border-none hover:text-black"
                              key={subcategory.id}
                              onClick={() => setSheetOpen(false)}
                              href={`/products/${catalog.slug}/${category.slug}/${subcategory.slug}`}
                            >
                              {subcategory.name}
                            </Link>
                          ),
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
