"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import type { ProductGroup } from "@/data/productGroups";
import { groupName } from "@/data/productGroups";
import {
  filterProductsList,
  sortProductsList,
  type AvailabilityFilter,
  type ProductSortOption,
} from "@/lib/catalog";
import { ProductGrid } from "@/components/ProductGrid";
import { useLocale } from "@/components/LocaleProvider";

type ProductFinderProps = {
  products: Product[];
  brands: string[];
  groups: ProductGroup[];
  variant?: "default" | "hero";
  showHeading?: boolean;
  title?: string;
  subtitle?: string;
  initialGroup?: string;
  initialBrand?: string;
  showAllByDefault?: boolean;
  browseHint?: string;
};

export function ProductFinder({
  products,
  brands,
  groups,
  variant = "default",
  showHeading = true,
  title,
  subtitle,
  initialGroup = "",
  initialBrand = "",
  showAllByDefault = true,
  browseHint,
}: ProductFinderProps) {
  const { locale, dictionary } = useLocale();
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState(initialGroup);
  const [brand, setBrand] = useState(initialBrand);
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const [sort, setSort] = useState<ProductSortOption>("relevance");

  useEffect(() => {
    setGroupId(initialGroup);
    setBrand(initialBrand);
  }, [initialGroup, initialBrand]);

  const hasActiveFilter = Boolean(
    query.trim() || groupId || brand || availability !== "all",
  );

  const filtered = useMemo(() => {
    const list = filterProductsList(products, {
      query,
      groupId: groupId || undefined,
      brand: brand || undefined,
      availability,
      locale,
    });
    return sortProductsList(list, sort);
  }, [products, query, groupId, brand, availability, sort, locale]);

  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "rounded-2xl border border-border bg-brand-white p-4 shadow-[var(--shadow-soft)] sm:p-6"
          : ""
      }
    >
      {showHeading ? (
        <div className={isHero ? "mb-4" : "mb-5 sm:mb-6"}>
          <h2
            className={
              isHero
                ? "text-xl font-extrabold text-brand-purple sm:text-2xl"
                : "text-2xl font-extrabold text-brand-purple sm:text-3xl"
            }
          >
            {title ?? dictionary.home.findProductTitle}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {subtitle ?? dictionary.home.findProductSubtitle}
          </p>
        </div>
      ) : null}

      <label className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dictionary.home.findProductSearch}
          className="h-12 w-full rounded-full border border-border bg-brand-light pl-11 pr-4 text-sm outline-none ring-brand-purple/20 transition placeholder:text-muted focus:border-brand-purple focus:bg-brand-white focus:ring-2"
          aria-label={dictionary.home.findProductSearch}
        />
      </label>

      <div className="mt-3 space-y-3">
        <FilterRow label={dictionary.productFinder.category}>
          <FilterButton
            active={!groupId}
            onClick={() => setGroupId("")}
            label={dictionary.productFinder.all}
          />
          {groups.map((group) => (
            <FilterButton
              key={group.id}
              active={groupId === group.id}
              onClick={() => setGroupId(group.id)}
              label={groupName(group, locale)}
            />
          ))}
        </FilterRow>

        <FilterRow label={dictionary.productFinder.brand}>
          <FilterButton
            active={!brand}
            onClick={() => setBrand("")}
            label={dictionary.productFinder.all}
          />
          {brands.map((item) => (
            <FilterButton
              key={item}
              active={brand === item}
              onClick={() => setBrand(item)}
              label={item}
            />
          ))}
        </FilterRow>

        <FilterRow label={dictionary.productFinder.availability}>
          <FilterButton
            active={availability === "all"}
            onClick={() => setAvailability("all")}
            label={dictionary.productFinder.all}
          />
          <FilterButton
            active={availability === "in-stock"}
            onClick={() => setAvailability("in-stock")}
            label={dictionary.productFinder.inStock}
          />
          <FilterButton
            active={availability === "out-of-stock"}
            onClick={() => setAvailability("out-of-stock")}
            label={dictionary.productFinder.outOfStock}
          />
        </FilterRow>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-muted">
          {hasActiveFilter || showAllByDefault
            ? dictionary.productFinder.results(filtered.length)
            : null}
        </p>
        {(hasActiveFilter || showAllByDefault) && (
          <label className="flex items-center gap-2 text-sm">
            <span className="shrink-0 font-semibold text-muted">
              {dictionary.productFinder.sort}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as ProductSortOption)}
              className="h-10 min-w-0 flex-1 rounded-full border border-border bg-brand-white px-3 text-xs font-semibold text-foreground outline-none ring-brand-purple/20 focus:border-brand-purple focus:ring-2 sm:max-w-[14rem] sm:text-sm"
              aria-label={dictionary.productFinder.sort}
            >
              <option value="relevance">
                {dictionary.productFinder.sortRelevance}
              </option>
              <option value="best-sellers">
                {dictionary.productFinder.sortBestSellers}
              </option>
            </select>
          </label>
        )}
      </div>

      <div className="mt-4">
        {!hasActiveFilter && !showAllByDefault ? (
          <div className="rounded-2xl border border-dashed border-border bg-brand-light px-4 py-10 text-center sm:px-6 sm:py-12">
            <p className="text-sm leading-relaxed text-muted">
              {browseHint ?? dictionary.productsPage.browseHint}
            </p>
          </div>
        ) : (
          <ProductGrid
            products={filtered.slice(0, isHero ? 8 : filtered.length)}
            emptyMessage={dictionary.productFinder.empty}
            emptyHint={
              groupId && filtered.length === 0
                ? dictionary.categoryPage.emptyHint
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
        active
          ? "bg-brand-purple text-white"
          : "border border-border bg-brand-white text-foreground hover:border-brand-purple"
      }`}
    >
      {label}
    </button>
  );
}