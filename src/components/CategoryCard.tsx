"use client";

import Image from "next/image";
import type { Category } from "@/data/categories";
import { categoryDescription, categoryName } from "@/data/categories";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";

const pastelBySlug: Record<string, string> = {
  emagrecedores: "bg-pastel-3",
  estetica: "bg-pastel-2",
  anabolizantes: "bg-pastel-1",
  hormonios: "bg-pastel-4",
  perfumaria: "bg-pastel-2",
  "vitaminas-suplementos": "bg-pastel-3",
  "saude-bem-estar": "bg-pastel-4",
};

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const { href, locale } = useLocale();
  const pastel = pastelBySlug[category.slug] ?? "bg-pastel-2";
  const name = categoryName(category, locale);

  return (
    <AppLink
      href={href(`/categoria/${category.slug}`)}
      className={`group flex h-full flex-col items-center rounded-2xl p-3 text-center transition active:scale-[0.98] sm:flex-row sm:items-center sm:gap-3 sm:p-4 sm:text-left hover:shadow-[var(--shadow-soft)] ${pastel}`}
    >
      <div className="relative mb-2 h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white/80 shadow-sm sm:mb-0 sm:h-14 sm:w-14">
        <Image
          src={category.image}
          alt={name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>

      <div className="min-w-0 w-full">
        <h3 className="truncate text-sm font-bold text-foreground group-hover:text-brand-purple sm:text-base">
          {name}
        </h3>
        <p className="mt-0.5 hidden text-xs text-muted sm:line-clamp-2 sm:block">
          {categoryDescription(category, locale)}
        </p>
      </div>
    </AppLink>
  );
}
