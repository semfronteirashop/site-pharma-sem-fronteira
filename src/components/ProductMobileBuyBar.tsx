"use client";

import type { Product } from "@/data/products";
import { productName } from "@/data/products";
import { ProductDetailActions } from "./ProductDetailActions";
import { useLocale } from "@/components/LocaleProvider";

export function ProductMobileBuyBar({ product }: { product: Product }) {
  const { locale } = useLocale();

  return (
    <div
      className="fixed inset-x-0 bottom-[4.5rem] z-30 border-t border-border bg-surface/95 px-3 py-3 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-lg space-y-2.5">
        <p className="truncate text-xs text-muted">
          {productName(product, locale)}
        </p>
        <ProductDetailActions product={product} layout="stacked" />
      </div>
    </div>
  );
}