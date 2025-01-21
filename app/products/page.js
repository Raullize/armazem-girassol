// app/products/page.js (executado no servidor)
import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import FilteredProducts from '@/components/products/filteredProdutctsByRange/filteredProducts';


export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return <FilteredProducts products={products} categories={categories}/>;
}