import ProductsPageContent from "@/components/products/ProductsPageContent";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Produtos | Armazém Girassol",
  description:
    "Explore nossa seleção completa de produtos naturais, grãos, temperos, chás, castanhas e muito mais.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
