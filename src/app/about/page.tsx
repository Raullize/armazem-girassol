import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { HardHat, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import FeaturesSection from '@/components/home/FeaturesSection';

export const metadata: Metadata = {
  title: 'Sobre Nós | Armazém Girassol',
  description: 'Conheça a história do Armazém Girassol.',
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col min-h-[70vh]">
      <FeaturesSection />
      <Container className="flex-1 flex flex-col items-center justify-center py-20">
        <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-sm border border-black/5">
          <div className="w-24 h-24 bg-[#F5EED8] rounded-full flex items-center justify-center mb-6">
            <HardHat className="w-12 h-12 text-[#2E8B57]" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-950 mb-4">
            Em Construção
          </h1>
          
          <p className="text-gray-500 text-lg mb-8">
            Estamos preparando uma página especial para contar a nossa história. Em breve, você poderá conhecer mais sobre a essência do Armazém Girassol.
          </p>
          
          <Link href="/">
            <Button className="flex items-center gap-2 px-8 py-6 rounded-full bg-[#2E8B57] text-white hover:bg-green-700 transition-colors shadow-md text-lg">
              <Home className="w-5 h-5" />
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
