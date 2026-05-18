import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoryCard from "@/components/category/CategoryCard";
import FeaturedCollectionsSection from "@/components/home/FeaturedCollectionsSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import { Category } from "@/types";

const HOME_CATEGORIES: Category[] = [
  { id: 1, name: "Temperos", slug: "temperos", image: "/images/categories/temperos.jpg" },
  { id: 2, name: "Grãos e Sementes", slug: "graos-sementes", image: "/images/categories/graos-e-sementes.jpg" },
  { id: 3, name: "Chás", slug: "chas", image: "/images/categories/chas.jpg" },
  { id: 4, name: "Frutas Secas", slug: "frutas-secas", image: "/images/categories/frutas-secas.jpg" },
  { id: 5, name: "Farinhas", slug: "farinhas", image: "/images/categories/farinhas.jpg" },
  { id: 6, name: "Castanhas e Nozes", slug: "castanhas-nozes", image: "/images/categories/castanhas-e-nozes.jpg" },
  { id: 7, name: "Snacks", slug: "snacks", image: "/images/categories/snacks.jpg" },
  { id: 8, name: "Kits e Presentes", slug: "kits", image: "/images/categories/kits-e-presentes.jpg" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />

      <Section className="bg-transparent">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <span className="text-[#2E8B57] font-bold tracking-wider uppercase text-sm mb-2 block">
                Categorias
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 font-serif">
                Tudo o que a natureza tem de bom.
              </h2>
            </div>

            <Link href="/products" className="text-amber-950 font-bold text-base hover:underline underline-offset-4 decoration-2 decoration-amber-950 flex items-center gap-1 whitespace-nowrap">
              Ver tudo
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
            {HOME_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Coleções em destaque — carregadas via service com loading state */}
      <FeaturedCollectionsSection />
    </>
  );
}
