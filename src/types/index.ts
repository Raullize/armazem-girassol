export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export type ProductUnit = '100g' | '1kg' | 'pacote' | 'unidade' | 'kit';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  rating?: number;
  reviewCount?: number;
  unit: ProductUnit;
  isBestSeller: boolean;
  image: string;
  stock: number;
}

export interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  productIds: number[];
}

export interface DbSchema {
  categories: Category[];
  products: Product[];
  featuredCollections: FeaturedCollection[];
}
