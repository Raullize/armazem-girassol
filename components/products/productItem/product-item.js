import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './product-item.module.css';
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
          <input
            type="number"
            min="50"
            step={10}
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.quantityInput}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id,
                name: nome,
                price: preco,
                quantity,
                unit: unidade_medida === 'KG' ? 'g' : 'UN',
              });
            }}
            className={styles.buyButton}
          >
            <FiShoppingCart className={styles.icon} /> Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
