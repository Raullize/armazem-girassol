'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Import do hook correto
import ListCategoriesSideBar from '@/components/listCategoriesSideBar/listCategoriesSideBar';
import styles from './styles.module.css';
import PriceRangeSlider from '@/components/priceRangeSlider/priceRangeSlider';
import ProductsGrid from '../productGrid/products-grid';

export default function FilteredProducts({ products, categories }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const searchParams = useSearchParams(); // Hook para acessar parâmetros da URL
  const search = searchParams.get('search') || ''; // Obtém o valor de "search" ou uma string vazia

  useEffect(() => {
    // Filtra produtos com base no termo de busca
    const lowerCaseSearch = search.toLowerCase();
    const filtered = products.filter((p) =>
      p.nome.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredProducts(filtered);
  }, [products, search]);

  const handleFilterChange = (min, max) => {
    setFilteredProducts((prevProducts) =>
      prevProducts.filter((p) => p.preco >= min && p.preco <= max)
    );
  };

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <h1>Produtos deliciosos<span className={styles.highlight}> para você</span></h1>

        <section>
          <h2>Filtros</h2>
          <PriceRangeSlider products={products} onFilterChange={handleFilterChange} />
          <ListCategoriesSideBar categories={categories} />
        </section>
      </aside>

      <section>
        <Suspense fallback={<p className={styles.loading}>Carregando produtos...</p>}>
          <ProductsGrid products={filteredProducts} />
        </Suspense>
      </section>
    </main>
  );
}
