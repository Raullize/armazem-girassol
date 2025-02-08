'use client';
import { FiX, FiTrash } from 'react-icons/fi';
import styles from './styles.module.css';

export default function CartModal({ cart, removeFromCart, clearCart, calculateTotalPrice, onClose, onCheckout }) {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemTotal =
        item.unit === 'g'
          ? (item.price / 1000) * item.quantity
          : item.price * item.quantity;
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.cartContainer} onClick={(e) => e.stopPropagation()}>
        {/* Destaque para o valor total */}
        <div className={styles.totalPriceContainer}>
          <h3>Total do Carrinho: R$ {getTotalPrice()}</h3>
        </div>

        <div className={styles.cartHeader}>
          <h2>Seu Carrinho</h2>
          <button aria-label="Fechar carrinho" className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <ul className={styles.cartItems}>
          {cart.length === 0 ? (
            <p className={styles.emptyMessage}>Seu carrinho está vazio.</p>
          ) : (
            cart.map((item) => {
              const unitLabel = item.unit === 'g' ? '100g' : 'UN';
              const pricePerUnit = item.unit === 'g' ? (item.price / 10).toFixed(2) : item.price.toFixed(2);
              const totalPrice = item.unit === 'g'
                ? ((item.price / 1000) * item.quantity).toFixed(2)
                : (item.price * item.quantity).toFixed(2);

              return (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.itemInfo}>
                    <span>
                      <strong>{item.quantity}{item.unit}{' -  '} </strong>
                      {item.name}
                    </span>
                    <span>
                      R$ {pricePerUnit} - {unitLabel}
                    </span>
                    <span>
                      Total: R$ {totalPrice}
                    </span>
                  </div>
                  <button
                    aria-label={`Remover ${item.name} do carrinho`}
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash />
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className={styles.cartFooter}>
          <button className={styles.clearButton} onClick={clearCart} disabled={cart.length === 0}>
            Limpar Carrinho
          </button>
          <button className={styles.checkoutButton} onClick={onCheckout}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
