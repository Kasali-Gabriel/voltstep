import { ProductFilters } from '@/utils/Product/productFilters';
import { Review } from './review';
import { SearchedProduct } from './search';

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
  catalog?: Catalog;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  categoryId: string;
  category?: Category;
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
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  reviews: Review[];
  subcategoryId: string;
  subcategory?: Subcategory;
  popularityScore?: number;
  lastScoreUpdate?: Date;
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
  subcategoryName?: string;
}

export interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
}

export interface ProductCardProps {
  query?: boolean;
  SearchedProduct?: SearchedProduct;
  setQuery?: (q: string) => void;
  recordViewedProduct?: (product: SearchedProduct) => void;
  isPage?: boolean;
  slug?: string[];
  loading?: boolean;
  notSubcategory?: boolean;
}

export interface ProductsListProps {
  query?: string;
  slug?: string[];
  filters?: Record<string, string>;
  initialProducts?: Product[] | SearchedProduct[];
  initialTotalCount?: number;
  initialHasMore?: boolean;
}

export interface ProductFilterProps {
  atProductListEnd?: boolean;
  filterBottomOffset?: number;
  isSearchResults?: boolean;
  slug?: string[];
  unfilteredResults?: SearchedProduct[];
}

export interface ProductListHeaderProps {
  query?: string;
  slug?: string[];
  isMobile: boolean;
  loading?: boolean;
  totalCount?: number;
}

export interface SortProductsProps {
  isMobile?: boolean;
  isSearchResults?: boolean;
  loading?: boolean;
}

export interface FilterProductsProps {
  products?: SearchedProduct[];
  slug?: string[];
  loading?: boolean;
}

export interface CatalogPagination {
  isSearch?: boolean;
  slug?: string[];
  sort?: string;
  filters?: ProductFilters;
  initialProducts?: Product[];
  initialTotalCount?: number;
  initialHasMore?: boolean;
  skipInitialFetch?: boolean;
}
