"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '../ui/Button';
import { useCart, CartItem } from '../../contexts/CartContext';

export default function CartSidebar({ children }: { children: React.ReactNode }) {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();

  const subtotalOriginal = cartItems.reduce((acc: number, item: CartItem) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const subtotalComDesconto = cartItems.reduce((acc: number, item: CartItem) => {
    const itemPrice = item.promotionalPrice || item.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  const totalDesconto = subtotalOriginal - subtotalComDesconto;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent showCloseButton={false} className="w-full sm:max-w-md flex flex-col p-0 border-l border-black/5 bg-[#FCF9EE]">
        <SheetHeader className="p-6 border-b-4 border-[#FDBA24] bg-[#2E8B57] relative">
          <SheetTitle className="flex items-center gap-2 text-white font-serif text-2xl">
            <ShoppingCart className="w-6 h-6 text-[#FDBA24]" />
            Seu Carrinho
          </SheetTitle>
          <SheetClose className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-[#F5EED8] rounded-full flex items-center justify-center mb-2">
                <ShoppingCart className="w-12 h-12 text-[#2E8B57] opacity-60" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-950">Carrinho vazio</h3>
              <p className="text-gray-500 text-sm max-w-[250px]">
                Que tal adicionar alguns dos nossos produtos naturais e saudáveis?
              </p>
              <SheetClose asChild>
                <Link href="/products" className="mt-4 w-full">
                  <Button className="w-full py-6 text-base rounded-full bg-[#2E8B57] hover:bg-green-700 text-white font-bold shadow-md hover:shadow-lg transition-all border-none">
                    Ver produtos
                  </Button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item: CartItem) => {
                const currentPrice = item.promotionalPrice || item.price;
                
                return (
                <div key={item.id} className="flex gap-4 bg-[#FFFDF4] p-3 rounded-2xl border border-black/5 shadow-sm relative group">
                  <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-black/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col grow justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-amber-950 line-clamp-1 pr-4">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.unit}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white border border-black/10 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-gray-500 hover:text-amber-950 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center text-amber-950">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-gray-500 hover:text-amber-950 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right flex flex-col">
                        {item.promotionalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                          </span>
                        )}
                        <span className="font-bold text-amber-950">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="p-6 bg-[#FFFDF4] border-t border-black/5 flex-col gap-4">
            <div className="flex flex-col w-full gap-3 mb-2">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Subtotal</span>
              <span className={`font-medium ${totalDesconto > 0 ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalOriginal)}
              </span>
            </div>
            
            {totalDesconto > 0 && (
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Desconto</span>
                <span className="font-medium text-gray-900">
                  - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDesconto)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center w-full mt-2 pt-3 border-t border-black/5">
              <span className="text-amber-950 font-bold text-base">Total</span>
              <span className="text-2xl font-bold text-amber-950">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalComDesconto)}
              </span>
            </div>
          </div>
          
          <SheetClose asChild>
            <Link href="/cart" className="w-full">
              <Button className="w-full py-6 text-lg rounded-full bg-[#FDBA24] text-amber-950 font-bold shadow-md hover:bg-yellow-400 hover:shadow-lg transition-all border-none">
                Ver Carrinho
              </Button>
            </Link>
          </SheetClose>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            Taxas e frete calculados no Carrinho
          </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}