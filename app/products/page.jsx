// app/products/page.js (executado no servidor)
import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import FilteredProducts from '@/components/products/filteredProducts';

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return <FilteredProducts products={products} categories={categories}/>;
}