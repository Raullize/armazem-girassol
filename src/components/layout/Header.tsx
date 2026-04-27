"use client";

import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { Flower2, ShoppingCart } from 'lucide-react';
import CartSidebar from '../cart/CartSidebar';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const { cartTotalQuantity } = useCart();

  return (
    <header className="bg-[#2E8B57] z-50 shadow-md border-b-4 border-[#FDBA24]">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Flower2 className="w-8 h-8 text-[#FDBA24]" />
            <span className="text-xl md:text-2xl font-bold text-white font-serif">
              Armazém Girassol
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-[#FDBA24] font-medium transition-colors">
              Início
            </Link>
            <Link href="/products" className="text-white hover:text-[#FDBA24] font-medium transition-colors">
              Produtos
            </Link>
            <Link href="/about" className="text-white hover:text-[#FDBA24] font-medium transition-colors">
              Sobre Nós
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-[#FDBA24] p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            <CartSidebar>
              <button className="relative text-white hover:text-[#FDBA24] p-2 rounded-full hover:bg-white/10 transition-colors group cursor-pointer">
                <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
                {cartTotalQuantity > 0 && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-[#FDBA24] rounded-full border-2 border-[#2E8B57] group-hover:scale-110 transition-transform"></span>
                )}
              </button>
            </CartSidebar>
          </div>
        </div>
      </Container>
    </header>
  );
}
