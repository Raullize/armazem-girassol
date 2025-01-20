import styles from './styles.module.css';
import Link from "next/link";
import { getTopProductsByCategory } from "@/lib/topProductsFromCategory";
import CarouselProducts from './carouselProducts'; // Importa o componente carrossel

export default async function ListProductsByCategory() {
  const groupedProducts = await getTopProductsByCategory(); // Busca os produtos agrupados por categoria

  return (
    <div>
      {Object.keys(groupedProducts).map((idCategoria) => {
        const categories = groupedProducts[idCategoria];

        return (
          <div key={idCategoria} className={styles.categorySection}>
            <h2 className={styles.categoriesTitle}>
              {categories.nomeCategoria}
              <Link className={styles.linkCategories} href={`/categories/${idCategoria}`}>Ver todos</Link>
            </h2>
            <CarouselProducts products={categories.produtos} /> {/* Usa o carrossel */}
          </div>
        );
      })}
    </div>
  );
}