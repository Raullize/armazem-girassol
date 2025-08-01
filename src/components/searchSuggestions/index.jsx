'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';

export default function SearchSuggestions({ query, products, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query.trim() || !products) {
      setSuggestions([]);
      return;
    }

    const filteredProducts = products
      .filter(product => 
        product.nome.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Limita a 5 sugestões

    setSuggestions(filteredProducts);
  }, [query, products]);

  if (!suggestions.length) return null;

  return (
    <div className={styles.suggestionsContainer}>
      {suggestions.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className={styles.suggestionItem}
          onClick={() => onSelect(product)}
        >
          <div className={styles.imageContainer}>
            {product.imagem && (
              <Image
                src={product.imagem}
                alt={product.nome}
                width={40}
                height={40}
                className={styles.productImage}
              />
            )}
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.nome}</h3>
            <p className={styles.productPrice}>
              R$ {product.preco.toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
