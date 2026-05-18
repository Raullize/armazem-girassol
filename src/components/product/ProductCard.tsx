"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import Button from '../ui/Button';
import { Star, Loader2, Check, PackageX } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [buttonState, setButtonState] = React.useState<'idle' | 'loading' | 'success'>('idle');
  const rating = product.rating || 0;
  const isOutOfStock = product.stock === 0;
  
  const discountPercentage = product.promotionalPrice 
    ? Math.round(((product.price - product.promotionalPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (buttonState !== 'idle' || isOutOfStock) return;
    
    setButtonState('loading');
    
    setTimeout(() => {
      addToCart(product);
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 2000);
    }, 600);
  };
  
  return (
    <div className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full ${isOutOfStock ? 'opacity-70' : ''}`}>
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image.replace('/public', '')}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ${isOutOfStock ? 'grayscale' : 'group-hover:scale-105'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center gap-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
              <PackageX className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Fora de Estoque
              </span>
            </div>
          </div>
        )}

        {/* Best Seller Badge */}
        {product.isBestSeller && !isOutOfStock && (
          <div className="absolute top-3 left-3 bg-[#FDBA24] text-amber-950 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-amber-950" />
            Mais Vendido
          </div>
        )}
        
        {/* Discount Badge */}
        {discountPercentage > 0 && !isOutOfStock && (
          <div className="absolute top-3 right-3 bg-[#2E8B57] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="grow">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className={`text-xl font-bold ${isOutOfStock ? 'text-gray-400' : 'text-gray-900'}`}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice || product.price)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              / {product.unit}
            </span>
            {product.promotionalPrice && !isOutOfStock && (
              <span className="text-sm text-gray-400 line-through ml-1">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </span>
            )}
          </div>

          <h3 className={`font-medium text-lg mb-1 transition-colors line-clamp-1 ${isOutOfStock ? 'text-gray-400' : 'text-gray-900 group-hover:text-amber-900'}`}>
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating 
                      ? isOutOfStock ? 'fill-gray-300 text-gray-300' : 'fill-amber-400 text-amber-400'
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
        
        {isOutOfStock ? (
          <button
            disabled
            className="w-full py-2 px-4 rounded-full text-sm font-medium bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <PackageX className="w-4 h-4" />
            Indisponível
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
