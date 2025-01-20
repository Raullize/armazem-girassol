
import ProductItem from '../productItem/product-item'
import styles from './products-grid.module.css'
export default function ProductsGrid({products}){
  return <ul className={styles.products}>
    {products.map(product => <li key={product.id}>
      <ProductItem id={`/products/${product.id}`} {...product}/>
    </li>)}
  </ul>
}