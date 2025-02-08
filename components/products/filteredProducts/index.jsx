'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import PriceRangeSlider from '@/components/priceRangeSlider';
import ProductsGrid from '../productGrid';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';
import { useSortOrder } from '@/hooks/useSortOrder';
import FilteredCategories from '@/components/filteredCategories';

export default function FilteredProducts({ products, categories }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const { selectedCategories, handleCategoryChange } = useCategoryFilter();
  const { sortOrder, handleSortChange } = useSortOrder();
  const filteredProducts = useFilteredProducts(products, search, priceRange, selectedCategories, sortOrder);

  const handleFilterChange = (min, max) => setPriceRange({ min, max });

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <h1>
          Produtos deliciosos<span className={styles.highlight}> para você</span>
        </h1>

        <section>
          <h2>Filtros</h2>
          <hr className={styles.hr}></hr>
          <PriceRangeSlider products={products} onFilterChange={handleFilterChange} />

          <hr className={styles.hr}></hr>
          <FilteredCategories
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
          <hr className={styles.hr}></hr>
          <div className={styles.sort}>
            <label htmlFor="sort">Ordenar por preço:</label>
            <select id="sort" value={sortOrder} onChange={handleSortChange}>
              <option value="default">Padrão</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </div>
        </section>
      </aside>

      <section className={styles.productsSection}>
        <Suspense fallback={<p className={styles.loading}>Carregando produtos...</p>}>
          <ProductsGrid products={filteredProducts} />
        </Suspense>
      </section>
    </main>
  );
}
