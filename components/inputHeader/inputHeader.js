'use client';

import styles from './styles.module.css';
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation'; // Import do App Router
import { useState } from 'react';

export default function InputHeader() {
  const [search, setSearch] = useState('');
  const router = useRouter(); // Hook correto para App Router

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search)}`); // Redireciona com a query string
      setSearch(''); // Limpa o input de busca após a navegação
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
