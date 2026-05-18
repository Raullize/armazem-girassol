"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Product, Category } from "@/types";
import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar, { SortOption } from "./FilterSidebar";
import FeaturesSection from "@/components/home/FeaturesSection";
import Container from "@/components/ui/Container";
import {
  PackageSearch,
  SlidersHorizontal,
  X,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/Sheet";

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-black/5 animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-gray-100 rounded-full w-1/4" />
          <div className="h-9 bg-gray-100 rounded-full w-1/3" />
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function ProductsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
      ]);
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    } catch {
      setError("Não foi possível carregar os produtos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setSelectedCategory(searchParams.get("category"));
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, searchQuery]);

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    handleCategoryChange(null);
    setSortBy("relevance");
    handleSearchChange("");
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const inStock = result.filter((p) => p.stock > 0);
    const outOfStock = result.filter((p) => p.stock === 0);

    const sortFn = (a: Product, b: Product) => {
      switch (sortBy) {
        case "price-asc":
          return (
            (a.promotionalPrice ?? a.price) - (b.promotionalPrice ?? b.price)
          );
        case "price-desc":
          return (
            (b.promotionalPrice ?? b.price) - (a.promotionalPrice ?? a.price)
          );
        case "best-seller":
          return Number(b.isBestSeller) - Number(a.isBestSeller);
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    };

    return [...inStock.sort(sortFn), ...outOfStock.sort(sortFn)];
  }, [products, categories, selectedCategory, sortBy, searchQuery]);

  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)?.name
    : null;

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  if (error) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-amber-950 mb-2">
          Ops! Algo deu errado
        </h2>
        <p className="text-gray-500 text-sm max-w-xs mb-6">{error}</p>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-6 py-2.5 bg-amber-950 text-white rounded-full text-sm font-semibold hover:bg-amber-900 transition cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <FeaturesSection />

      <Container className="w-full">
        <div className="py-8 md:py-12 w-full">
          {/* Page Header */}
          <div className="mb-8 w-full">
            <nav className="flex items-center text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-amber-950 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              {selectedCategoryName ? (
                <>
                  <button
                    onClick={handleClearFilters}
                    className="hover:text-amber-950 transition-colors cursor-pointer"
                  >
                    Produtos
                  </button>
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="font-semibold text-amber-950">
                    {selectedCategoryName}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-amber-950">Produtos</span>
              )}
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 font-serif">
              {searchQuery ? (
                <>
                  Resultados para{" "}
                  <span className="text-[#2E8B57]">"{searchQuery}"</span>
                </>
              ) : selectedCategoryName ? (
                selectedCategoryName
              ) : (
                "Nossa Seleção Completa"
              )}
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              Produtos naturais selecionados com carinho para você e sua família.
            </p>
          </div>

          {/* Mobile: Filter toggle button */}
          <div className="flex items-center justify-between mb-6 lg:hidden w-full">
            <span className="text-sm text-gray-500">
              {isLoading
                ? "Carregando..."
                : `${filteredAndSorted.length} produto${filteredAndSorted.length !== 1 ? "s" : ""} encontrado${filteredAndSorted.length !== 1 ? "s" : ""}`}
            </span>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-full text-sm font-medium text-amber-950 shadow-sm hover:shadow-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
          </div>

          <div className="flex gap-8 lg:gap-10 items-start w-full">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-full lg:w-64 xl:w-72 shrink-0">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                sortBy={sortBy}
                searchQuery={searchQuery}
                onCategoryChange={handleCategoryChange}
                onSortChange={setSortBy}
                onSearchChange={handleSearchChange}
                onClearFilters={handleClearFilters}
                totalResults={filteredAndSorted.length}
                isLoading={isLoading}
              />
            </div>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {/* Desktop result count */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">
                  {isLoading
                    ? "Buscando produtos..."
                    : `${filteredAndSorted.length} produto${filteredAndSorted.length !== 1 ? "s" : ""} encontrado${filteredAndSorted.length !== 1 ? "s" : ""}`}
                </span>
              </div>

              {/* Loading Skeleton */}
              {isLoading ? (
                <ProductGridSkeleton />
              ) : filteredAndSorted.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 w-full text-center bg-white rounded-2xl border border-black/5">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <PackageSearch className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-950 mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xs mb-6">
                    Tente ajustar os filtros ou buscar por outro termo.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2.5 bg-amber-950 text-white rounded-full text-sm font-semibold hover:bg-amber-900 transition cursor-pointer"
                  >
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-2">
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-black/10 rounded-lg text-sm font-medium text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition cursor-pointer disabled:cursor-not-allowed"
                      >
                        Anterior
                      </button>

                      <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-hide">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => {
                              setCurrentPage(i + 1);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg text-sm font-medium transition cursor-pointer ${currentPage === i + 1
                              ? "bg-[#2E8B57] text-white"
                              : "text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-black/10 rounded-lg text-sm font-medium text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition cursor-pointer disabled:cursor-not-allowed"
                      >
                        Próximo
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Filter Drawer */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-full sm:max-w-md p-0 bg-white border-r border-black/5 flex flex-col"
        >
          <SheetHeader className="p-6 border-b-4 border-[#FDBA24] bg-[#2E8B57] relative">
            <SheetTitle className="flex items-center gap-2 text-white font-serif text-2xl">
              <SlidersHorizontal className="w-6 h-6 text-[#FDBA24]" />
              Filtros
            </SheetTitle>
            <SheetClose className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>
          <div className="flex-1 overflow-hidden p-6 pb-2">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onCategoryChange={(cat) => {
                handleCategoryChange(cat);
                setMobileFiltersOpen(false);
              }}
              onSortChange={(sort) => {
                setSortBy(sort);
                setMobileFiltersOpen(false);
              }}
              onSearchChange={handleSearchChange}
              onClearFilters={handleClearFilters}
              totalResults={filteredAndSorted.length}
              isLoading={isLoading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
