'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function ListCategories({ categories }) {
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    router.push(`/products?category=${categoryId}`);
  };

  return (
    <section className={styles.categoriesHeader}>
      <ul className={styles.categoriesList}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/products?category=${category.id}`}>
              <span>{category.nome}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
