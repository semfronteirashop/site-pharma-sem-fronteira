"use client";

import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type ProductCarouselProps = {
  products: Product[];
  emptyMessage?: string;
};

export function ProductCarousel({
  products,
  emptyMessage = "",
}: ProductCarouselProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-brand-white/80 px-4 py-8 text-center text-sm leading-relaxed text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[min(78vw,280px)] shrink-0 snap-start min-[420px]:w-[min(46vw,280px)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="hidden md:grid md:grid-cols-3 md:gap-3.5 lg:grid-cols-4 lg:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
