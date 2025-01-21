import { useState, useEffect } from 'react';

export function useFilteredProducts(products, search, priceRange, selectedCategories, sortOrder) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const applyFilters = () => {
      const lowerCaseSearch = search.toLowerCase();

      let filtered = products.filter((p) => {
        const matchesSearch = p.nome.toLowerCase().includes(lowerCaseSearch);
        const matchesPrice = p.preco >= priceRange.min && p.preco <= priceRange.max;
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.idCategoria);

        return matchesSearch && matchesPrice && matchesCategory;
      });

      if (sortOrder === 'asc') {
        filtered = filtered.sort((a, b) => a.preco - b.preco);
      } else if (sortOrder === 'desc') {
        filtered = filtered.sort((a, b) => b.preco - a.preco);
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, search, priceRange, selectedCategories, sortOrder]);

  return filteredProducts;
}
