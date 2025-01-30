'use client';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './styles.module.css';

const sunflowerBg = '/images/sunflowerBg.png';

export default function CartIcon({ cartCount, onClick }) {
  return (
    <button
      aria-label="Abrir carrinho"
      className={styles.floatingCart}
      onClick={onClick}
      style={{
        backgroundImage: `url(${sunflowerBg})`
      }}
    >
      <FiShoppingCart  className={styles.iconCart}/>
      {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
    </button>
  );
}