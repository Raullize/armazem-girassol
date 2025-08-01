'use client';

import styles from './styles.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Limita o número de páginas mostradas
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) {
      return [...pages.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        Anterior
      </button>
      
      {visiblePages.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className={styles.pageButton}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        Próxima
      </button>
    </div>
  );
}
