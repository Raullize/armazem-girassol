import ProductsPageContent from "@/components/products/ProductsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos | Armazém Girassol",
  description:
    "Explore nossa seleção completa de produtos naturais, grãos, temperos, chás, castanhas e muito mais.",
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
