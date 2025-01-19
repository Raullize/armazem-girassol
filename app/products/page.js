import ProductsGrid from '@/components/products/products-grid'
import styles from './styles.module.css' 
import { getProducts } from '@/lib/products'
import { Suspense } from 'react';

async function Products(){
  const products = await getProducts();

  return <ProductsGrid products={products}/>
}
export default function ProductsPage() {
  

  return <>
    <header className={styles.header}>
      <h1>Produtos deliciosos 
        <span className={styles.highlight}> para você</span>
      </h1>
    </header>
    <main className={styles.main}>
      <Suspense fallback={<p className={styles.loading}>Fetching products</p>}>
        <Products/>
      </Suspense>
        
    </main>
  </>
}

