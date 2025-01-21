'use client';

import { useRouter } from 'next/navigation'; // Para redirecionar

export default function ListCategoriesSideBar({ categories }) {
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    router.push(`/products?categoryId=${categoryId}`); // Redireciona com o ID da categoria
  };

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <button onClick={() => handleCategoryClick(category.id)}>
            {category.nome} {/* Nome da categoria */}
          </button>
        </li>
      ))}
    </ul>
  );
}