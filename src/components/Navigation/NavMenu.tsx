'use client';

import { Catalog, Category, Subcategory } from '@/types/product';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

const NavMenu = ({ catalogs }: { catalogs: Catalog[] }) => {
  return (
    <div className="flex w-full items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {catalogs.map((catalog: Catalog) => (
            <NavigationMenuItem key={catalog.id}>
              <NavigationMenuTrigger className="cursor-pointer font-bold hover:bg-neutral-200">
                <Link key={catalog.id} href={`/products/${catalog.slug}`}>
                  {catalog.name}
                </Link>
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="grid w-[500px] grid-cols-3 gap-10 p-4 lg:w-[600px]">
                  {catalog.categories.map((category: Category) => (
                    <div key={category.id} className="space-y-4 text-sm">
                      <h4 className="font-semibold uppercase">
                        <Link
                          key={category.id}
                          href={`/products/${catalog.slug}/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                      </h4>

                      <div className="flex flex-col space-y-3">
                        {category.subcategories?.map(
                          (subcategory: Subcategory) => (
                            <Link
                              className="flex w-full cursor-pointer items-start justify-start font-semibold text-stone-500 hover:text-black"
                              key={subcategory.id}
                              href={`/products/${catalog.slug}/${category.slug}/${subcategory.slug}`}
                            >
                              {subcategory.name}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
