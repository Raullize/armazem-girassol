import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi'; // Ícone do carrinho de compras
import styles from './product-item.module.css';
import Link from 'next/link';

export default function ProductItem({ nome, id, image, preco }) {
  const imageSrc = image || '/noImage.png';

  return (
    <article className={styles.product}>
      <div className={styles.imageWrapper}>

          <Image src={imageSrc} alt={nome} fill className={styles.image} />

      </div>
      <div className={styles.details}>
        <h2>{nome}</h2>
        <p className={styles.price}>R$ {parseFloat(preco).toFixed(2)}</p>
        <div className={styles.actions}>
          <input
            type="number"
            min="1"
            defaultValue="0"
            className={styles.quantityInput}
          />
          <Link  href={`/products/${id}`}>
            <button className={styles.buyButton}>
              <FiShoppingCart className={styles.icon} /> Adicionar
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}