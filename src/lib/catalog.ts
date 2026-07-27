import { categories, type Category } from "@/data/categories";
import { products, type Product } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { productDescription } from "@/data/products";
import { categoryName } from "@/data/categories";

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.onSale);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

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
