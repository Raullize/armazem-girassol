import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-transparent overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Camada 1: imagem de fundo */}
        <div className="absolute inset-0 w-full h-full bg-[url('/images/banners/hero-store.jpg')] bg-cover bg-center object-cover" />
        {/* Camada 2: gradiente sobreposto */}
        <div className="absolute inset-0 bg-linear-to-r from-[#FCF9EE]/95 via-[#FCF9EE]/70 to-[#FCF9EE]/20" />
      </div>

      <Container className="relative z-10 py-20 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight mb-6 font-serif">
            O a granel mais <span className="relative inline-block z-10">queridinho<span className="absolute bottom-1.5 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FDBA24] -z-10"></span></span> da região.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-lg">
            Dê um giro na sua vida com os produtos naturais do Armazém Girassol. Qualidade, frescor e carinho em cada grão.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-[#FDBA24] text-amber-950 font-bold text-base px-7 py-3 rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg transition-all w-full sm:w-auto">
              Ver Produtos
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center bg-[#FFFDF4] text-amber-950 font-bold text-base px-7 py-3 rounded-full border border-amber-200/50 shadow-sm hover:bg-white hover:shadow-md transition-all w-full sm:w-auto">
              Conheça a loja
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
