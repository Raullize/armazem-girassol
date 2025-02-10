import { useMemo } from 'react';

export function useFilteredProducts(products, search, priceRange, selectedCategories, sortOrder) {
  return useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const lowerCaseSearch = search.toLowerCase();

    let filtered = products.filter((p) => {
      const matchesSearch = p.nome.toLowerCase().includes(lowerCaseSearch);
      const matchesPrice = p.preco >= priceRange.min && p.preco <= priceRange.max;
      
      // Se não houver categorias selecionadas ou se o produto pertencer a uma das categorias selecionadas
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.idCategoria);

      return matchesSearch && matchesPrice && matchesCategory;
    });

    // Ordenação por preço
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.preco - b.preco);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.preco - a.preco);
    }

    return filtered;
  }, [products, search, priceRange.min, priceRange.max, selectedCategories, sortOrder]);
}
