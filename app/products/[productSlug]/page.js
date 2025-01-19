import Image from 'next/image'
import styles from './styles.module.css'
import { getProduct } from '@/lib/products'
import { notFound } from 'next/navigation'

export default function ProductsDetailPage({params}) {
  const product = getProduct(params.productSlug)
  if(!product){
    notFound();
  }

  return <>
    <header className={styles.header}>
      <div className={styles.image}>
        {/* <Image src={product.image} alt={product.title} fill /> */}
      </div>
      <div className={styles.headerText}>
        <h1>{product.nome}</h1>
        <p></p>
      </div>
    </header>
    <main></main>
  </>
}