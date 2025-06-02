import { Review } from "./review";



export interface Catalog {
  id: string;
  name: string;
  slug: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  subcategories: Subcategory[];
  catalogId: string;
  catalog: Catalog;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  categoryId: string;
  category: Category;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  sizes: string[];
  colors: string[];
  tags: Tag[];
  reviews: Review[];
  subcategoryId: string;
  subcategory: Subcategory;
}

export enum Tag {
  NEW_ARRIVAL = 'NEW_ARRIVAL',
  BESTSELLER = 'BESTSELLER',
  FLASH_SALE = 'FLASH_SALE',
  BACK_IN_STOCK = 'BACK_IN_STOCK',
}

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  sizeError?: boolean;
  setSizeError?: (error: boolean) => void;
  isTitle?: boolean;
}

export interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
}