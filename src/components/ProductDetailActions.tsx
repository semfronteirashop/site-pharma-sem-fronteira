"use client";

import type { Product } from "@/data/products";
import { productHasPrice, productName } from "@/data/products";
import { buildProductOrderMessage, buildSupportMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductWhatsAppPriceButton } from "@/components/ProductWhatsAppPriceButton";
import { useLocale } from "@/components/LocaleProvider";

type ProductDetailActionsProps = {
  product: Product;
  layout?: "inline" | "stacked";
};

export function ProductDetailActions({
  product,
  layout = "inline",
}: ProductDetailActionsProps) {
  const { dictionary, locale } = useLocale();
  const hasPrice = productHasPrice(product);

  if (!hasPrice) {
    return (
      <ProductWhatsAppPriceButton
        product={product}
        variant="detail"
        className={layout === "stacked" ? "w-full" : "w-full sm:max-w-md"}
      />
    );
  }

  const whatsappUrl = buildWhatsAppUrl(
    buildProductOrderMessage(
      {
        name: productName(product, locale),
        brand: product.brand,
        price: product.price!,
      },
      locale,
    ),
  );

  const stack = layout === "stacked";

  return (
    <div
      className={
        stack
          ? "flex flex-col gap-2.5"
          : "flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
      }
    >
      <AddToCartButton
        product={product}
        className={stack ? "w-full" : "w-full sm:w-auto"}
      />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex h-12 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green px-6 text-sm font-bold text-white transition hover:bg-brand-green-dark ${
          stack ? "w-full" : "w-full sm:w-auto"
        }`}
      >
        {dictionary.productPage.finalizeWhatsapp}
      </a>
    </div>
  );
}
