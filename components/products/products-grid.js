import ProductItem from './product-item'
import styles from './products-grid.module.css'
export default function ProductsGrid({products}){
  return <ul className={styles.products}>
    {products.map(product => <li key={product.id}>
      <ProductItem {...product}/>
    </li>)}
  </ul>
}