import { getCategories, getFeaturedCollections } from "@/lib/data";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoryCard from "@/components/category/CategoryCard";
import FeaturedSection from "@/components/home/FeaturedSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";

export default async function Home() {
  const categories = await getCategories();
  const featuredCollections = await getFeaturedCollections();

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
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </Section>

      {featuredCollections.map((collection) => (
        <FeaturedSection
          key={collection.id}
          title={collection.title}
          subtitle={collection.subtitle}
          products={collection.products}
          bgColor="bg-transparent"
        />
      ))}
    </>
  );
}
