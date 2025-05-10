'use client';

import { useProductStore } from '@/lib/state';
import { Category, ProductsData, Subcategory } from '@/types/product';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { useEffect } from 'react';

const NavMenu = () => {
  const { productData, fetchProductDataIfNeeded } = useProductStore();

  useEffect(() => {
    fetchProductDataIfNeeded();
  }, [fetchProductDataIfNeeded]);

  return (
    <div className="flex w-full items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {productData.map((product: ProductsData) => (
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
