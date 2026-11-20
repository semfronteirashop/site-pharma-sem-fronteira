"use client";

import type { Product } from "@/data/products";
import { productName } from "@/data/products";
import { useLocale } from "@/components/LocaleProvider";

type ProductImagePlaceholderProps = {
  product: Product;
  className?: string;
  compact?: boolean;
};

/** Placeholder lilás para produtos sem foto em /produtos/skincare. */
export function ProductImagePlaceholder({
  product,
  className = "",
  compact = false,
}: ProductImagePlaceholderProps) {
  const { locale } = useLocale();
  const name = productName(product, locale);

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-[#F3EDFC] px-3 text-center ${className}`}
      aria-hidden
    >
      <p
        className={`font-extrabold uppercase tracking-wide text-brand-purple ${
          compact ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
        }`}
      >
        {product.brand}
      </p>
      <p
        className={`mt-1.5 line-clamp-4 font-semibold leading-snug text-foreground/85 ${
          compact ? "text-[10px]" : "text-[11px] sm:text-xs"
        }`}
      >
        {name}
      </p>
    </div>
  );
}