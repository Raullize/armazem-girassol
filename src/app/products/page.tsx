import { getCategories, getProducts } from "@/lib/data";
import ProductsPageContent from "@/components/products/ProductsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos | Armazém Girassol",
  description:
    "Explore nossa seleção completa de produtos naturais, grãos, temperos, chás, castanhas e muito mais.",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, q } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <ProductsPageContent
      products={products}
      categories={categories}
      initialCategory={category ?? null}
      initialSearchQuery={q ?? ""}
    />
  );
}
