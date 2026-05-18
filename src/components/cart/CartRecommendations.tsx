"use client";

import React, { useEffect, useState } from "react";
import {
  featuredCollectionService,
  FeaturedCollectionWithProducts,
} from "@/services/featuredCollectionService";
import FeaturedSection from "@/components/home/FeaturedSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

function RecommendationsSkeleton() {
  return (
    <div className="mb-12 md:mb-24">
      <Section className="bg-transparent">
        <Container>
          {/* Header skeleton */}
          <div className="flex justify-between items-end mb-10">
            <div className="space-y-2">
              <div className="h-3 bg-gray-100 rounded-full w-24 animate-pulse" />
              <div className="h-8 bg-gray-100 rounded-full w-64 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-100 rounded-full w-20 animate-pulse" />
          </div>

          {/* Cards skeleton */}
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_20%] shrink-0"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-black/5 animate-pulse">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                    <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                    <div className="h-3 bg-gray-100 rounded-full w-full" />
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-6 bg-gray-100 rounded-full w-1/4" />
                      <div className="h-9 bg-gray-100 rounded-full w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default function CartRecommendations() {
  const [recommendation, setRecommendation] = useState<FeaturedCollectionWithProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    featuredCollectionService
      .getAll()
      .then((collections) => {
        if (collections && collections.length > 0) {
          setRecommendation(collections[0]);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <RecommendationsSkeleton />;
  }

  if (!recommendation) {
    return null;
  }

  return (
    <div className="mb-12 md:mb-24">
      <FeaturedSection
        title="Recomendações para você"
        subtitle="Você também pode gostar"
        products={recommendation.products}
        viewAllLink="/products"
      />
    </div>
  );
}
