export interface ProductCatalog {
  _id: string;
  products_data: ProductsData[];
}

export interface ProductsData {
  id: number;
  name: string;
  slug: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_category: number; // ID reference to ProductsData
  subcategories?: Subcategory[];
  products?: Product[]; // Some categories may have products directly
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  parent_category: number;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  quantity: number;
  src: string[];
  sizes?: string[];
  colors?: string[];
  tags?: ('new arrival' | 'bestseller' | 'flash sale' | 'back in stock')[];
  reviews?: Review[];
}

export interface Review {
  reviewer: string;
  rating: number;
  comment?: string;
  date?: Date;
}
