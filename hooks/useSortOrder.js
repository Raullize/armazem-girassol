import { useState } from 'react';

export function useSortOrder() {
  const [sortOrder, setSortOrder] = useState('default');

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return { sortOrder, handleSortChange };
}
