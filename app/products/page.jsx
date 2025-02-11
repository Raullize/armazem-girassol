import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import FilteredProducts from '@/components/products/filteredProducts';

export default async function ProductsPage({ searchParams }) {
  const categoryId = searchParams?.category ? parseInt(searchParams.category) : null;
  const products = await getProducts(categoryId);
  const categories = await getCategories();

  return <FilteredProducts products={products} categories={categories} />;
}