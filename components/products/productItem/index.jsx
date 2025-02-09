'use client';

import Image from 'next/image';
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import styles from './styles.module.css';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductItem({ nome, id, image, preco, unidade_medida }) {
  const imageSrc = image || '/noImage.png';
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(
    unidade_medida === 'KG' ? 100 : 1
  );

  const handleQuantityChange = (e) => {
    const value = Math.max(50, Math.ceil(Number(e.target.value) / 10) * 10); 
    setQuantity(value);
  };

  const handleIncrement = () => {
    const step = unidade_medida === 'KG' ? 50 : 1;
    setQuantity(prev => prev + step);
  };

  const handleDecrement = () => {
    const step = unidade_medida === 'KG' ? 50 : 1;
    const minValue = unidade_medida === 'KG' ? 50 : 1;
    setQuantity(prev => Math.max(minValue, prev - step));
  };

  const pricePer100g = unidade_medida === 'KG' ? (preco / 10).toFixed(2) : preco.toFixed(2);
  const totalPrice = unidade_medida === 'KG'
    ? ((preco / 1000) * quantity).toFixed(2)
    : (preco * quantity).toFixed(2);

  const unitLabel = unidade_medida === 'KG' ? `${quantity}g` : `${quantity} UN`;

  return (
    <article className={styles.product}>
      <Link href={`/products/${id}`} className={styles.imageWrapper}>
        <Image src={imageSrc} alt={nome} fill className={styles.image} />
      </Link>

      <div className={styles.details}>
        <Link href={`/products/${id}`}>
          <h2 className={styles.productName}>{nome}</h2>
        </Link>

        <p className={styles.price}>
          R$ {totalPrice} ({unitLabel})
        </p>

        <div className={styles.actions}>
          <div className={styles.quantityWrapper}>
            <button 
              type="button" 
              onClick={handleDecrement}
              className={`${styles.quantityButton} ${styles.decrementButton}`}
              aria-label="Diminuir quantidade"
            >
              <FiMinus />
            </button>
            <input
              type="number"
              min={unidade_medida === 'KG' ? "50" : "1"}
              step={unidade_medida === 'KG' ? "50" : "1"}
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button 
              type="button" 
              onClick={handleIncrement}
              className={`${styles.quantityButton} ${styles.incrementButton}`}
              aria-label="Aumentar quantidade"
            >
              <FiPlus />
            </button>
          </div>

          <button
            className={styles.buyButton}
            onClick={() => addToCart({ id, nome, preco, quantity, image, unidade_medida })}
          >
            <FiShoppingCart className={styles.icon} />
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
