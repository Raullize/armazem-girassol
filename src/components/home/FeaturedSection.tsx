"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import ProductCard from '../product/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  bgColor?: string;
  viewAllLink?: string;
}

export default function FeaturedSection({
  title,
  subtitle,
  products,
  bgColor = 'bg-transparent',
  viewAllLink = '/products'
}: FeaturedSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const initCarousel = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Use requestAnimationFrame to avoid synchronous state updates during initial render
    requestAnimationFrame(() => {
      initCarousel();
    });

    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, initCarousel, onSelect]);

  return (
    <Section className={bgColor}>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            {subtitle && (
              <span className="text-[#2E8B57] font-bold tracking-wider uppercase text-sm mb-2 block">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 font-serif">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <button
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-950 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-950 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link href={viewAllLink} className="text-amber-950 font-bold text-base hover:underline underline-offset-4 decoration-2 decoration-amber-950 flex items-center gap-1 whitespace-nowrap">
              Ver tudo
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="overflow-hidden -my-4 py-4" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6 touch-pan-y">
              {products.map((product) => (
                <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_20%] pl-4 md:pl-6 pb-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
