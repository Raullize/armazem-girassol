'use client';

import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function ListCategoriesSideBar({ categories }) {
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    router.push(`/products?categoryId=${categoryId}`);
  };

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <button onClick={() => handleCategoryClick(category.id)}>
            {category.nome}
          </button>
        </li>
      ))}
    </ul>
  );
}
