'use client';

import { fetchCatalogData } from '@/lib/utils';
import { Catalog, Category, Subcategory } from '@/types/product';
import { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

const NavMenu = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCatalogData();
      setCatalogs(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex w-full items-center">
      <NavigationMenu delayDuration={0}>
        <NavigationMenuList>
          {catalogs.map((product) => (
            <NavigationMenuItem key={product.id}>
              <NavigationMenuTrigger className="cursor-pointer font-bold">
                {product.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] grid-cols-3 gap-10 p-4 lg:w-[600px]">
                  {product.categories.map((category: Category) => (
                    <div key={category.id} className="space-y-4 text-sm">
                      <h4 className="font-semibold uppercase">
                        {category.name}
                      </h4>

                      <div className="flex flex-col space-y-3">
                        {category.subcategories?.map((sub: Subcategory) => (
                          <div
                            className="flex w-full cursor-pointer items-start justify-start font-semibold text-stone-500 hover:text-black"
                            key={sub.id}
                          >
                            {sub.name}
                          </div>
                        ))}
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
