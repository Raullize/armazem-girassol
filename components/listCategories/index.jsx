'use client';

import Link from 'next/link';
import styles from './styles.module.css';

export default function ListCategories({ categories }) {
  return (
    <section className={styles.categoriesHeader}>
      <ul className={styles.categoriesList}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.id}`}>{category.nome}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
