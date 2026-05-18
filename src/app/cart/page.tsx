import React from 'react';
import FeaturesSection from '@/components/home/FeaturesSection';
import CartPageContent from '@/components/cart/CartPageContent';
import CartRecommendations from '@/components/cart/CartRecommendations';

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Features Cards no topo */}
      <FeaturesSection />
      
      <CartPageContent />

      {/* Recomendações (Client Component com Loading) */}
      <CartRecommendations />
    </div>
  );
}