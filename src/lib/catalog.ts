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

export type AvailabilityFilter = "all" | "in-stock" | "out-of-stock";
export type ProductSortOption = "relevance" | "best-sellers";

export type ProductListFilters = {
  query?: string;
  groupId?: string;
  categorySlug?: string;
  brand?: string;
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
  return getVisibleCategories();
}

/** Categorias com pelo menos 1 produto no catalogo. */
export function getCategoryProductCount(slug: string): number {
  return getProductsByCategory(slug).length;
}

export function getProductGroupProductCount(groupId: string): number {
  return getProductsByGroupId(groupId).length;
}

export function getVisibleProductGroups(): ReturnType<typeof getAllProductGroups> {
  return getAllProductGroups().filter(
    (g) => getProductGroupProductCount(g.id) > 0,
  );
}

export function getVisibleCategories(): Category[] {
  return getAllCategories().filter(
    (c) => getCategoryProductCount(c.slug) > 0,
  );
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

export function getBrandsByGroupId(groupId: string): string[] {
  return [
    ...new Set(getProductsByGroupId(groupId).map((p) => p.brand.trim()).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));
}
