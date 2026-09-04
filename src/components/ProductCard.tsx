"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { productHasImage, productHasPrice } from "@/data/products";
import { discountPercent, formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { AppLink } from "@/components/AppLink";
import { ProductWhatsAppPriceButton } from "@/components/ProductWhatsAppPriceButton";
import { useLocale } from "@/components/LocaleProvider";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "offer" | "launch";
};

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { href, locale, dictionary } = useLocale();
  const discount = discountPercent(product.price, product.originalPrice);
  const isOffer = variant === "offer" || (variant === "default" && product.onSale);
  const hasPrice = productHasPrice(product);

  return (
    <article
      className={`card-hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border bg-brand-white shadow-[0_1px_0_rgba(74,22,140,0.04)] hover:shadow-[var(--shadow-soft)] ${
        isOffer
          ? "border-brand-green/35 ring-1 ring-brand-green/10"
          : "border-border"
      }`}
    >
      <div className="relative">
        <AppLink
          href={href(`/produto/${product.slug}`)}
          className="relative block aspect-[1/1.05] overflow-hidden bg-brand-light"
        >
          <div className="absolute inset-x-3 bottom-0 top-3 rounded-t-[999px] bg-white/70 sm:inset-x-4 sm:top-4" />
          {productHasImage(product) ? (
            <Image
              src={product.image!}
              alt={product.name}
              fill
              sizes="(max-width: 419px) 100vw, (max-width: 768px) 50vw, 25vw"
              className="object-contain p-3 transition duration-300 group-hover:scale-[1.03] sm:p-4"
            />
          ) : null}
        </AppLink>

        <div className="absolute left-2 top-2 z-10 flex max-w-[70%] flex-col gap-1">
          {discount ? (
            <span className="w-fit rounded-full bg-sale px-2 py-0.5 text-[10px] font-bold text-white shadow-sm sm:text-[11px]">
              -{discount}%
            </span>
          ) : null}
          {!discount && variant === "launch" && product.newLaunch ? (
            <span className="w-fit rounded-full bg-brand-purple px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm sm:text-[11px]">
              {dictionary.productCard.launch}
            </span>
          ) : null}
          {!discount && variant !== "launch" && isOffer && !product.newLaunch ? (
            <span className="w-fit rounded-full bg-brand-green px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm sm:text-[11px]">
              {dictionary.productCard.offer}
            </span>
          ) : null}
          {!discount && variant === "default" && product.bestSeller ? (
            <span className="w-fit rounded-full bg-brand-purple px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm sm:text-[11px]">
              {dictionary.productCard.bestSeller}
            </span>
          ) : null}
        </div>

        {hasPrice ? (
          <div className="absolute bottom-2 right-2 z-10 md:hidden">
            <AddToCartButton product={product} iconOnly />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3 sm:pt-2.5">
        <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-[11px]">
          {product.brand}
        </p>

        <AppLink href={href(`/produto/${product.slug}`)} className="mt-0.5">
          <h3 className="line-clamp-2 min-h-[2.4rem] text-[13px] font-bold leading-snug text-foreground group-hover:text-brand-purple sm:min-h-[2.6rem] sm:text-sm">
            {product.name}
          </h3>
        </AppLink>

        <p className="mt-1 truncate text-[11px] text-muted">
          {product.dosage} · {product.unit}
        </p>

        <div className="mt-auto pt-2">
          {hasPrice ? (
            <>
              {product.originalPrice ? (
                <p className="text-[11px] text-muted line-through">
                  {formatPrice(product.originalPrice, locale)}
                </p>
              ) : (
                <div className="h-[16px] md:h-0" />
              )}
              <div className="flex items-end justify-between gap-2">
                <p className="text-[15px] font-extrabold leading-none text-brand-purple sm:text-lg">
                  {formatPrice(product.price, locale)}
                </p>
                <div className="hidden shrink-0 md:block">
                  <AddToCartButton product={product} compact />
                </div>
              </div>
            </>
          ) : (
            <ProductWhatsAppPriceButton product={product} variant="card" />
          )}
        </div>
      </div>
    </article>
  );
}
