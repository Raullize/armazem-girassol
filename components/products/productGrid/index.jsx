'use client';

import ProductItem from '../productItem';
import styles from './styles.module.css';

export default function ProductsGrid({ products }) {
  return (
    <ul className={styles.products}>
      {products.map(product => (
        <li key={product.id}>
          <ProductItem 
            id={`/${product.id}`}
            nome={product.nome}
            preco={product.preco}
            image={product.imagem}
            {...product}
          />
        </li>
      ))}
    </ul>
  );
}
