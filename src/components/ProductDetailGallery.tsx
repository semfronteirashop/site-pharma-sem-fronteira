"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import {
  productImages,
  productName,
} from "@/data/products";
import { useLocale } from "@/components/LocaleProvider";

type ProductDetailGalleryProps = {
  product: Product;
};

export function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const { locale } = useLocale();
  const images = productImages(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const alt = productName(product, locale);

  return (
    <div className="min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-light">
        <div className="absolute inset-x-6 bottom-0 top-6 rounded-t-[999px] bg-white/70 sm:inset-x-8 sm:top-8" />
        {activeImage ? (
          <Image
            key={activeImage}
            src={activeImage}
            alt={alt}
            fill
            priority
            className="object-contain p-4 sm:p-6"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${alt} ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-brand-light transition sm:h-[4.5rem] sm:w-[4.5rem] ${
                activeIndex === index
                  ? "border-brand-purple ring-2 ring-brand-purple/20"
                  : "border-border hover:border-brand-purple/30"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain p-1.5"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
