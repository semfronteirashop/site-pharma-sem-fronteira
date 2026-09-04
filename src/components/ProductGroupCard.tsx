"use client";

import type { ProductGroup } from "@/data/productGroups";
import { groupName } from "@/data/productGroups";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";

type ProductGroupCardProps = {
  group: ProductGroup;
};

export function ProductGroupCard({ group }: ProductGroupCardProps) {
  const { href, locale, dictionary } = useLocale();
  const name = groupName(group, locale);
  const isReady = group.categorySlugs.length > 0;

  return (
    <AppLink
      href={href(`/categoria/${group.id}`)}
      className="card-hover-lift group flex h-full min-h-[4.5rem] flex-col justify-center rounded-xl border border-border/70 bg-brand-white px-3.5 py-3 transition hover:border-brand-purple/25 hover:shadow-[var(--shadow-soft)] sm:min-h-[5rem] sm:px-4 sm:py-3.5"
    >
      <h3 className="text-sm font-bold leading-snug text-foreground group-hover:text-brand-purple sm:text-[15px]">
        {name}
      </h3>
      <p className="mt-1 text-[11px] text-muted sm:text-xs">
        {isReady
          ? dictionary.productsPage.exploreCategory
          : dictionary.productsPage.categoryComingSoon}
      </p>
    </AppLink>
  );
}
