import { useState, useCallback } from 'react';

export function useCategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = useCallback((categoryId) => {
    if (!categoryId) return;
    
    setSelectedCategories(prevSelected => {
      // Se a categoria já estiver selecionada, não faz nada
      if (prevSelected.includes(categoryId)) {
        return prevSelected;
      }
      // Caso contrário, adiciona a categoria
      return [categoryId];
    });
  }, []);

  const clearCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  return { selectedCategories, handleCategoryChange, clearCategories };
}
