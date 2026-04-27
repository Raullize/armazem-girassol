import React from 'react';
import FeaturesSection from '@/components/home/FeaturesSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import { getFeaturedCollections } from '@/lib/data';
import CartPageContent from '@/components/cart/CartPageContent';

export default async function CartPage() {
  const featuredCollections = await getFeaturedCollections();
  const recommendations = featuredCollections.length > 0 ? featuredCollections[0] : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Features Cards no topo */}
      <FeaturesSection />
      
      <CartPageContent />

      {recommendations && (
        <div className="mb-12 md:mb-24">
          <FeaturedSection
            title="Recomendações para você"
            subtitle="Você também pode gostar"
            products={recommendations.products}
            viewAllLink="/products"
          />
        </div>
      )}
    </div>
  );
}