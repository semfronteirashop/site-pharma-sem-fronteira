import type { MetadataRoute } from "next";
import { getAllProductGroups, getAllProducts } from "@/lib/catalog";
import { getAllCategoryRouteSlugs } from "@/data/productGroups";
import { absoluteUrl } from "@/lib/seo";
import { locales } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/produtos",
    "/ofertas",
    "/lancamentos",
    "/mais-procurados",
    "/sobre-nos",
    "/como-comprar",
    "/privacidade",
    "/termos",
    "/autenticidade",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(localizePath(locale, path)),
        lastModified: now,
        changeFrequency: path === "/" || path === "/produtos" ? "daily" : "weekly",
        priority: path === "/" ? 1 : 0.7,
      });
    }

    for (const slug of getAllCategoryRouteSlugs()) {
      entries.push({
        url: absoluteUrl(localizePath(locale, `/categoria/${slug}`)),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const product of getAllProducts()) {
      entries.push({
        url: absoluteUrl(localizePath(locale, `/produto/${product.slug}`)),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
