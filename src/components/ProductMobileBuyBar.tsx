"use client";

import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { useLocale } from "@/components/LocaleProvider";

export function ProductMobileBuyBar({ product }: { product: Product }) {
  const { locale } = useLocale();

  return (
    <div
      className="fixed inset-x-0 bottom-[4.5rem] z-30 border-t border-border bg-surface/95 px-3 py-3 backdrop-blur md:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted">{product.name}</p>
          <p className="text-base font-extrabold text-price">
            {formatPrice(product.price, locale)}
          </p>
        </div>
        <AddToCartButton product={product} compact className="min-w-[8.5rem]" />
      </div>
    </div>
  );
}
