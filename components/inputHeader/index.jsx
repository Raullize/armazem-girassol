'use client';

import styles from './styles.module.css';
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InputHeader() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Pesquisar por..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className={styles.searchButton}>
        <FiSearch size={20} />
      </button>
    </form>
  );
}
