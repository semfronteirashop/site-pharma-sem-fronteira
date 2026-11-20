"use client";

import type { Product } from "@/data/products";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductWhatsAppPriceButton } from "@/components/ProductWhatsAppPriceButton";

type ProductDetailActionsProps = {
  product: Product;
  layout?: "inline" | "stacked";
};

export function ProductDetailActions({
  product,
  layout = "inline",
}: ProductDetailActionsProps) {
  const stack = layout === "stacked";

  return (
    <div
      className={
        stack
          ? "flex flex-col gap-2.5"
          : "flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
      }
    >
      <ProductWhatsAppPriceButton
        product={product}
        variant="detail"
        className={stack ? "w-full" : "w-full sm:flex-1"}
      />
      <AddToCartButton
        product={product}
        className={stack ? "w-full" : "w-full sm:w-auto"}
      />
    </div>
  );
}