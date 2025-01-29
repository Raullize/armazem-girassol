'use client'
import Image from 'next/image';
import styles from './styles.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductDetail({ product }) {
  const imageSrc = product.imagem || '/noImage.png';
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.productContainer}>
      {/* Imagem e Miniatura */}
      <div className={styles.imageSection}>
        <Image src={imageSrc} alt={product.nome} className={styles.mainImage} width={550} height={550} />
      </div>
      <div className={styles.productInfo}>
        <span className={styles.badge}>Disponível!</span>
        <h1 className={styles.productTitle}>{product.nome}</h1>
        <hr></hr>
        <p className={styles.productDescription}>
          <strong>Descrição:</strong> {product.descricao}
        </p>
        <p className={styles.productPrice}>R$ {product.preco.toFixed(2)}</p>

        <div className={styles.purchaseSection}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={styles.quantityInput}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Enviando os dados corretos para o carrinho
              addToCart({
                id: product.id,
                name: product.nome,
                price: product.preco,
                quantity: quantity,
              });
            }}
            className={styles.buyButton}
          >
            <FiShoppingCart className={styles.icon} /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
