import { useState } from 'react';

export function useSortOrder() {
  const [sortOrder, setSortOrder] = useState('default');

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  return { sortOrder, handleSortChange };
}
