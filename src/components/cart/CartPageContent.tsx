"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, MapPin, ArrowLeft, ShoppingCart } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCart, CartItem } from '../../contexts/CartContext';

export default function CartPageContent() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const subtotalOriginal = cartItems.reduce((acc: number, item: CartItem) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const subtotalComDesconto = cartItems.reduce((acc: number, item: CartItem) => {
    const itemPrice = item.promotionalPrice || item.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  const totalDesconto = subtotalOriginal - subtotalComDesconto;
  const frete = 15.00; // Mock de frete para visualização
  const totalFinal = subtotalComDesconto + frete;

  if (!mounted) {
    return null;
  }

  return (
    <div className="py-8 md:py-12 grow">
      <Container>
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-amber-950 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continuar comprando
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-950 mt-4">
            Seu Carrinho
          </h1>
        </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-[#FFFDF4] rounded-3xl border border-black/5 shadow-sm">
          <div className="w-24 h-24 bg-[#F5EED8] rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-[#2E8B57] opacity-60" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-amber-950 mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
            Parece que você ainda não escolheu nenhum produto. Que tal explorar nossa variedade de itens naturais?
          </p>
          <Link href="/products">
            <Button className="py-6 px-10 text-lg rounded-full shadow-md bg-[#2E8B57] hover:bg-green-700 text-white font-bold transition-all border-none">
              Ver Produtos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="bg-[#FFFDF4] rounded-2xl shadow-sm border border-black/5 p-4 md:p-6">
              <div className="flex flex-col gap-6">
                {cartItems.map((item: CartItem) => {
                  const currentPrice = item.promotionalPrice || item.price;
                  
                  return (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-black/5 last:border-0 last:pb-0 first:pt-0 relative group">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-xl overflow-hidden shrink-0 border border-black/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col grow justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg text-amber-950">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.unit}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-white border border-black/10 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-gray-500 hover:text-amber-950 transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-amber-950">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-gray-500 hover:text-amber-950 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right flex flex-col">
                        {item.promotionalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                          </span>
                        )}
                        <span className="text-lg font-bold text-amber-950">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

        <div className="w-full lg:w-1/3">
              <div className="bg-[#FFFDF4] rounded-2xl shadow-sm border border-black/5 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-amber-950 mb-6">Resumo do Pedido</h2>
            
            {/* Calculadora de Frete Placeholder */}
            <div className="mb-6 pb-6 border-b border-black/5">
              <label className="block text-sm font-medium text-amber-950 mb-2">Calcular Frete</label>
              <div className="flex gap-2">
                <div className="relative grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="00000-000" 
                    className="block w-full pl-9 pr-3 py-2 bg-white border border-black/10 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm outline-none"
                  />
                </div>
                <Button variant="secondary" className="px-4 bg-white border border-black/10 text-amber-950 hover:bg-gray-50">Calcular</Button>
              </div>
            </div>

            {/* Valores */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className={`font-medium ${totalDesconto > 0 ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalOriginal)}
                </span>
              </div>
              
              {totalDesconto > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Desconto</span>
                  <span className="font-medium text-gray-900">
                    - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDesconto)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className="font-medium text-gray-900">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(frete)}
                </span>
              </div>
              
              <div className="border-t border-black/5 mt-3 pt-3 flex justify-between items-end">
                <span className="font-bold text-amber-950 text-lg">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-amber-950 block">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalFinal)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full py-6 text-lg rounded-full shadow-md bg-[#2E8B57] hover:bg-green-700 text-white flex items-center justify-center gap-2 border-none">
                <FaWhatsapp className="w-5 h-5" />
                Finalizar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
        </div>
      )}
      </Container>
    </div>
  );
}