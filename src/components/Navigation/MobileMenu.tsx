'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchCatalogData } from '@/lib/utils';
import { Catalog } from '@/types/product';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronDown, ChevronUp, Heart, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

const MobileMenu = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCatalogData();
      setCatalogs(data);
    };
    fetchData();
  }, []);

  return (
    <Sheet>
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
            <button className="cursor-pointer">
              <Heart size={20} strokeWidth={1.5} className="h-7 w-7" />
            </button>

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
              {catalogs.map((product) => (
                <TabsTrigger
                  key={product.id}
                  value={String(product.id)}
                  className="cursor-pointer border-b-1 border-transparent px-1 pt-2 pb-1.5 font-semibold text-black uppercase data-[state=active]:border-b-[2.5px] data-[state=active]:border-black"
                >
                  {product.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {catalogs.map((product) => (
              <TabsContent
                key={product.id}
                value={String(product.id)}
                className="h-full w-full px-4"
              >
                {product.categories.map((category) => (
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
                        {category.subcategories?.map((subcategory) => (
                          <span
                            className="border-b border-stone-300 py-5 text-sm font-semibold text-stone-500 last:border-none"
                            key={subcategory.id}
                          >
                            {subcategory.name}
                          </span>
                        ))}
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
