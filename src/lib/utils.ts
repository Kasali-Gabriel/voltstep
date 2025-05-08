import { ProductCatalog } from '@/types/product';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchProductData = async () => {
  const response = await axios.get<ProductCatalog[]>('/api/products');
  const catalogs = response.data;

  const allProducts = catalogs.flatMap((catalog) => catalog.products_data);

  return allProducts;
};
