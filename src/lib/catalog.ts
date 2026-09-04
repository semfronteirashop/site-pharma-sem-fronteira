import { categories, type Category } from "@/data/categories";
import {
  products,
  productName,
  productDescription,
  type Product,
} from "@/data/products";
import {
  getAllImportedProducts,
  getDuplicateCatalogIdGroups,
  getImportedProductByImportId,
  getImportedProductsByCatalogId,
  IMPORTED_CATALOG_ROW_COUNT,
  IMPORTED_CATALOG_SOURCE_FILE,
  type SpreadsheetProductRecord,
} from "@/data/catalog-import";
import {
  getGroupCategorySlugs,
  getAllProductGroups,
} from "@/data/productGroups";
import type { Locale } from "@/i18n/config";
import { categoryName } from "@/data/categories";

export type PriceRangeId = "all" | "low" | "mid" | "high";
export type AvailabilityFilter = "all" | "in-stock" | "out-of-stock";
export type ProductSortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "best-sellers";

export const PRICE_RANGE_BOUNDS: Record<
  Exclude<PriceRangeId, "all">,
  { min: number; max: number }
> = {
  low: { min: 0, max: 300_000 },
  mid: { min: 300_001, max: 700_000 },
  high: { min: 700_001, max: Number.MAX_SAFE_INTEGER },
};

export type ProductListFilters = {
  query?: string;
  groupId?: string;
  categorySlug?: string;
  brand?: string;
  priceRange?: PriceRangeId;
  availability?: AvailabilityFilter;
  locale: Locale;
};

export function getAllProducts(): Product[] {
  return products;
}

/** Catalogo legado atual (77 produtos) — alias explicito. */
export function getLegacyProducts(): Product[] {
  return products;
}

/** Produtos importados da planilha oficial (estrutura separada, nao mesclada ao legado). */
export {
  getAllImportedProducts,
  getDuplicateCatalogIdGroups,
  getImportedProductByImportId,
  getImportedProductsByCatalogId,
  IMPORTED_CATALOG_ROW_COUNT,
  IMPORTED_CATALOG_SOURCE_FILE,
  type SpreadsheetProductRecord,
};

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.onSale);
}

export function getNewLaunches(): Product[] {
  return products.filter((p) => p.newLaunch === true);
}

export function filterProductsList(
  list: Product[],
  {
    query,
    groupId,
    categorySlug,
    brand,
    priceRange = "all",
    availability = "all",
    locale,
  }: ProductListFilters,
): Product[] {
  let result = list;

  if (groupId) {
    const slugs = getGroupCategorySlugs(groupId);
    if (slugs.length > 0) {
      result = result.filter((p) => slugs.includes(p.categorySlug));
    } else {
      result = [];
    }
  }

  if (categorySlug) {
    result = result.filter((p) => p.categorySlug === categorySlug);
  }

  if (brand) {
    result = result.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase(),
    );
  }

  if (priceRange !== "all") {
    const { min, max } = PRICE_RANGE_BOUNDS[priceRange];
    result = result.filter(
      (p) => typeof p.price === "number" && p.price >= min && p.price <= max,
    );
  }

  if (availability === "in-stock") {
    // Todos os produtos sao considerados disponiveis no catalogo.
  } else if (availability === "out-of-stock") {
    result = [];
  }

  if (query?.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter((p) => {
      const category = getCategoryBySlug(p.categorySlug);
      const haystack = [
        productName(p, locale),
        p.name,
        p.brand,
        p.dosage,
        productDescription(p, locale),
        p.categorySlug,
        category ? categoryName(category, locale) : "",
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return result;
}

export function sortProductsList(
  list: Product[],
  sort: ProductSortOption,
): Product[] {
  const copy = [...list];

  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) =>
          (a.price ?? Number.MAX_SAFE_INTEGER) -
          (b.price ?? Number.MAX_SAFE_INTEGER),
      );
    case "price-desc":
      return copy.sort(
        (a, b) =>
          (b.price ?? -1) - (a.price ?? -1),
      );
    case "best-sellers":
      return copy.sort(
        (a, b) =>
          Number(b.bestSeller) - Number(a.bestSeller) ||
          a.name.localeCompare(b.name),
      );
    case "relevance":
    default:
      return copy.sort((a, b) => {
        const score = (p: Product) =>
          (p.featured ? 4 : 0) +
          (p.bestSeller ? 2 : 0) +
          (p.newLaunch ? 1 : 0) +
          (p.onSale ? 1 : 0);
        return score(b) - score(a) || a.name.localeCompare(b.name);
      });
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProductsByGroupId(groupId: string): Product[] {
  const slugs = getGroupCategorySlugs(groupId);
  if (slugs.length === 0) return [];
  return products.filter((p) => slugs.includes(p.categorySlug));
}

export { getAllProductGroups };

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedCategories(): Category[] {
  return getAllCategories().filter((c) => c.featured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchProducts(query: string, locale: Locale): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products.filter((p) => {
    const category = getCategoryBySlug(p.categorySlug);
    const haystack = [
      productName(p, locale),
      p.name,
      p.brand,
      p.dosage,
      productDescription(p, locale),
      p.categorySlug,
      category ? categoryName(category, locale) : "",
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) => p.id !== product.id && p.categorySlug === product.categorySlug,
    )
    .slice(0, limit);
}

export function getBrands(): string[] {
  return [...new Set(products.map((p) => p.brand))].sort();
}
