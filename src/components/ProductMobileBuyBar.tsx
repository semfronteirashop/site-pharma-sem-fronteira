"use client";

import type { Product } from "@/data/products";
import { productHasPrice, productName } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductDetailActions } from "./ProductDetailActions";
import { ProductWhatsAppPriceButton } from "./ProductWhatsAppPriceButton";
import { useLocale } from "@/components/LocaleProvider";

export function ProductMobileBuyBar({ product }: { product: Product }) {
  const { locale } = useLocale();
  const hasPrice = productHasPrice(product);

  return (
    <div
      className="fixed inset-x-0 bottom-[4.5rem] z-30 border-t border-border bg-surface/95 px-3 py-3 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-lg space-y-2.5">
        {hasPrice ? (
          <>
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted">
                  {productName(product, locale)}
                </p>
                <p className="text-base font-extrabold text-price">
                  {formatPrice(product.price, locale)}
                </p>
              </div>
            </div>
            <ProductDetailActions product={product} layout="stacked" />
          </>
        ) : (
          <>
            <p className="truncate text-xs text-muted">
              {productName(product, locale)}
            </p>
            <ProductWhatsAppPriceButton product={product} variant="detail" />
          </>
        )}
      </div>
    </div>
  );
}
