"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from '../ui/Container';
import { Flower2, ShoppingCart, Search, X } from 'lucide-react';
import CartSidebar from '../cart/CartSidebar';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const { cartTotalQuantity } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-[#2E8B57] z-50 shadow-md border-b-4 border-[#FDBA24]">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Flower2 className="w-8 h-8 text-[#FDBA24]" />
              <span className="text-xl md:text-2xl font-bold text-white font-serif">
                Armazém Girassol
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8 shrink-0">
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
          <div className="flex items-center justify-end gap-4 flex-1">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-full px-4 py-1.5 transition-all w-36 md:w-56 border border-[#FDBA24]/30">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  autoFocus
                  className="bg-transparent text-white placeholder:text-white/70 focus:outline-none w-full text-sm font-medium"
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="text-white/70 hover:text-[#FDBA24] ml-2 cursor-pointer transition-colors shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-[#FDBA24] p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <Search className="w-6 h-6" />
              </button>
            )}

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
