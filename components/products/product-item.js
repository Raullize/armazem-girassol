import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi'; // Ícone do carrinho de compras
import styles from './product-item.module.css';

export default function ProductItem({ nome, slug, image, preco }) {
  return (
    <article className={styles.product}>
      <div className={styles.imageWrapper}>
        {/* Usar imagem padrão caso image esteja indefinida */}
        {image ? (
          <Image src={image} alt={nome} fill className={styles.image} />
        ) : (
          <div className={styles.placeholder}>Imagem não disponível</div>
        )}
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
          <button className={styles.buyButton}>
            <FiShoppingCart className={styles.icon} /> Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}