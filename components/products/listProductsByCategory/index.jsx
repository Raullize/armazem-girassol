'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from "next/link";
import { FiArrowRight } from 'react-icons/fi';
import CarouselProducts from '../carouselProducts';

export default function ListProductsByCategory() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setGroupedProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Carregando produtos...</div>;
  }

  return (
    <div>
      {Object.keys(groupedProducts).map((idCategoria) => {
        const categories = groupedProducts[idCategoria];
        return (
          <div key={idCategoria} className={styles.categorySection}>
            <div className={styles.categoriesTitle}>
              <h2>{categories.nomeCategoria}</h2>
              <Link className={styles.linkCategories} href={`/categories/${idCategoria}`}>
                Ver todos
                <FiArrowRight />
              </Link>
            </div>
            <CarouselProducts products={categories.produtos} />
          </div>
        );
      })}
    </div>
  );
}
