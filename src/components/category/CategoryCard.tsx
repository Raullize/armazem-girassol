import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.slug}`} className="group block w-full relative aspect-3/4 sm:aspect-square md:aspect-4/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <Image
        src="/images/products/noImage.png"
        alt={category.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      
      {/* Degradê Escuro (Bottom to Top) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
      
      {/* Conteúdo (Título e Link Explorar) */}
      <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex flex-col justify-end">
        <h3 className="font-bold text-white text-xl md:text-2xl mb-1 drop-shadow-md">
          {category.name}
        </h3>
        <span className="text-[#FCF9EE]/90 text-sm font-medium flex items-center gap-1 group-hover:text-[#FDBA24] transition-colors">
          Explorar
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </span>
      </div>
    </Link>
  );
}
