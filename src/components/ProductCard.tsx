"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { discountPercent, formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { useLocale } from "@/components/LocaleProvider";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { href, locale, dictionary } = useLocale();
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_0_rgba(17,24,39,0.03)] transition hover:shadow-[var(--shadow-soft)]">
      <div className="relative">
        <Link
          href={href(`/produto/${product.slug}`)}
          className="relative block aspect-[1/1.05] overflow-hidden bg-[#eef3fa]"
        >
          <div className="absolute inset-x-3 bottom-0 top-3 rounded-t-[999px] bg-white/70 sm:inset-x-4 sm:top-4" />
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-3 transition duration-300 group-hover:scale-[1.03] sm:p-4"
          />
        </Link>

        <div className="absolute left-2 top-2 z-10 flex max-w-[70%] flex-col gap-1">
          {discount ? (
            <span className="w-fit rounded-full bg-sale px-2 py-0.5 text-[10px] font-bold text-white shadow-sm sm:text-[11px]">
              -{discount}%
            </span>
          ) : null}
          {!discount && product.bestSeller ? (
            <span className="w-fit rounded-full bg-blue px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm sm:text-[11px]">
              {dictionary.productCard.bestSeller}
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-2 right-2 z-10 md:hidden">
          <AddToCartButton product={product} iconOnly />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3 sm:pt-2.5">
        <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-[11px]">
          {product.brand}
        </p>

        <Link href={href(`/produto/${product.slug}`)} className="mt-0.5">
          <h3 className="line-clamp-2 min-h-[2.4rem] text-[13px] font-bold leading-snug text-foreground group-hover:text-blue sm:min-h-[2.6rem] sm:text-sm">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 truncate text-[11px] text-muted">
          {product.dosage} · {product.unit}
        </p>

        <div className="mt-auto pt-2">
          {product.originalPrice ? (
            <p className="text-[11px] text-muted line-through">
              {formatPrice(product.originalPrice, locale)}
            </p>
          ) : (
            <div className="h-[16px] md:h-0" />
          )}
          <div className="flex items-end justify-between gap-2">
            <p className="text-[15px] font-extrabold leading-none text-blue sm:text-lg">
              {formatPrice(product.price, locale)}
            </p>
            <div className="hidden md:block">
              <AddToCartButton product={product} compact />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
