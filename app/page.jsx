import styles from "./page.module.css";
import Link from "next/link";
import ImageSlideshow from "@/components/imageSlideshow";
import ListCategories from "@/components/listCategories";
import { getCategories } from "@/lib/categories";
import ListProductsByCategory from "@/components/products/listProductsByCategory";


async function Categories() {
  const categories = await getCategories(); // Busca os dados do banco
  return <ListCategories categories={categories} />;
}

export default function Home() {
  return (
    <>
      <div className={styles.categories}>
        <Categories />
      </div>
      
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Bem-estar natural<br></br> para sua vida</h1>
            <p>Escolha saúde com nossos produtos naturais.</p>
          </div>
          <button className={styles.cta}>
            <Link href="/products">Conheça nossos produtos!</Link>
          </button>
        </div>
        <div className={styles.slideshow}>
          <ImageSlideshow />
        </div>
      </header>
      <main>
        <ListProductsByCategory />
      </main>

    </>
  );
}
