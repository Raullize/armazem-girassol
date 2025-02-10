'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import PriceRangeSlider from '@/components/priceRangeSlider';
import ProductsGrid from '../productGrid';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';
import { useSortOrder } from '@/hooks/useSortOrder';
import FilteredCategories from '@/components/filteredCategories';

export default function FilteredProducts({ products, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category');

  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const { selectedCategories, handleCategoryChange, clearCategories } = useCategoryFilter();
  const { sortOrder, handleSortChange } = useSortOrder();

  // Filtra os produtos
  const filteredProducts = useFilteredProducts(products, search, priceRange, selectedCategories, sortOrder);

  // Atualiza as categorias selecionadas quando a URL muda
  useEffect(() => {
    if (category) {
      const categoryId = parseInt(category);
      handleCategoryChange(categoryId);
    } else {
      clearCategories();
    }
  }, [category, handleCategoryChange, clearCategories]);

  // Handler para mudança de categoria nos checkboxes
  const handleCategoryChangeAndUpdateURL = useCallback((categoryId) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (selectedCategories.includes(categoryId)) {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', categoryId.toString());
    }
    router.push(`/products?${newSearchParams.toString()}`);
  }, [router, searchParams, selectedCategories]);

  const handleFilterChange = (min, max) => setPriceRange({ min, max });

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <h1>
          Produtos deliciosos<span className={styles.highlight}> para você</span>
        </h1>

        <section>
          <h2>Filtros</h2>
          <hr className={styles.hr} />
          <PriceRangeSlider products={products} onFilterChange={handleFilterChange} />

          <hr className={styles.hr} />
          <FilteredCategories
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChangeAndUpdateURL}
          />
          <hr className={styles.hr} />
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
          <ProductsGrid products={filteredProducts} searchTerm={search} />
        </Suspense>
      </section>
    </main>
  );
}
