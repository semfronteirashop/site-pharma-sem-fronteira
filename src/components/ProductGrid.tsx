"use client";

import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export type ProductGridVariant = "default" | "offer" | "launch";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
  emptyHint?: string;
  variant?: ProductGridVariant;
};

export function ProductGrid({
  products,
  emptyMessage = "",
  emptyHint,
  variant = "default",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-brand-light px-4 py-12 text-center sm:px-6 sm:py-14">
        <p className="text-base font-semibold text-brand-purple">{emptyMessage}</p>
        {emptyHint ? (
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            {emptyHint}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 min-[420px]:gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
