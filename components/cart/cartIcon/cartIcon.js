// components/CartIcon.js
'use client';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './styles.module.css';

export default function CartIcon({ cartCount, onClick }) {
  return (
    <button
      aria-label="Abrir carrinho"
      className={styles.floatingCart}
      onClick={onClick}
    >
      <FiShoppingCart />
      {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
    </button>
  );
}
