import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Produto Não Encontrado</h1>
      <p className={styles.message}>
        Desculpe, não conseguimos encontrar o produto que você está procurando.
      </p>
      <Link href="/products" className={styles.link}>
        Voltar para Produtos
      </Link>
    </main>
  );
}