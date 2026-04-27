"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import Button from '../ui/Button';
import { Star, Loader2, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [buttonState, setButtonState] = React.useState<'idle' | 'loading' | 'success'>('idle');
  const rating = product.rating || 0;
  
  const discountPercentage = product.promotionalPrice 
    ? Math.round(((product.price - product.promotionalPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (buttonState !== 'idle') return;
    
    setButtonState('loading');
    
    // Simula um delay de carregamento de 600ms para UX
    setTimeout(() => {
      addToCart(product);
      setButtonState('success');
      
      // Volta para o estado normal após 2 segundos
      setTimeout(() => setButtonState('idle'), 2000);
    }, 600);
  };
  
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image.replace('/public', '')}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-[#FDBA24] text-amber-950 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-amber-950" />
            Mais Vendido
          </div>
        )}
        
        {discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-[#2E8B57] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="grow">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-xl font-bold text-gray-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice || product.price)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              / {product.unit}
            </span>
            {product.promotionalPrice && (
              <span className="text-sm text-gray-400 line-through ml-1">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </span>
            )}
          </div>

          <h3 className="font-medium text-lg text-gray-900 mb-1 group-hover:text-amber-900 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              {product.reviewCount ? `(${product.reviewCount})` : 'Sem avaliações'}
            </span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>
        
        <Button 
          variant={buttonState === 'success' ? "default" : "outline"}
          onClick={handleAddToCart}
          disabled={buttonState === 'loading'}
          className={`w-full rounded-full font-normal transition-all duration-300 relative overflow-hidden cursor-pointer ${
            buttonState === 'success' 
              ? "bg-[#2E8B57] text-white border-transparent hover:bg-green-700" 
              : "border-gray-300 text-gray-900 hover:bg-[#2E8B57] hover:text-white hover:border-transparent"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {buttonState === 'idle' && (
              <span>Comprar agora</span>
            )}
            
            {buttonState === 'loading' && (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Adicionando...</span>
              </>
            )}

            {buttonState === 'success' && (
              <>
                <Check className="w-4 h-4 animate-in zoom-in" />
                <span>Adicionado!</span>
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
}
