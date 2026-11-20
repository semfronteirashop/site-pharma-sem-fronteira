"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import {
  productImageSrc,
  productName,
  productShowsCatalogVisual,
} from "@/data/products";
import { ProductImagePlaceholder } from "@/components/ProductImagePlaceholder";
import { useLocale } from "@/components/LocaleProvider";

type ProductMediaProps = {
  product: Product;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
};

export function ProductMedia({
  product,
  className = "",
  imageClassName = "object-contain p-3 transition duration-300 group-hover:scale-[1.03] sm:p-4",
  sizes,
  priority = false,
}: ProductMediaProps) {
  const { locale } = useLocale();
  const alt = productName(product, locale);
  const src = productImageSrc(product);
  const [failed, setFailed] = useState(false);

  if (!productShowsCatalogVisual(product) || !src || failed) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <ProductImagePlaceholder product={product} className="absolute inset-0" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={imageClassName}
      onError={() => setFailed(true)}
    />
  );
}