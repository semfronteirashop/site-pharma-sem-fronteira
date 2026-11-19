import type { Metadata } from "next";
import { site, tSite } from "@/data/site";
import type { Product } from "@/data/products";
import { productDescription } from "@/data/products";
import type { Category } from "@/data/categories";
import { categoryDescription, categoryName } from "@/data/categories";
import type { ProductGroup } from "@/data/productGroups";
import { groupDescription, groupName } from "@/data/productGroups";
import { locales, localeToOg, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

const defaultOg = "/og-default.svg";

export function absoluteUrl(path = "/"): string {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = defaultOg,
  noIndex = false,
  locale,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  locale: Locale;
}): Metadata {
  const localizedPath = localizePath(locale, path);
  const url = absoluteUrl(localizedPath);
  const fullTitle =
    title === site.name ? title : `${title} | ${site.shortName}`;

  const languages = Object.fromEntries(
    locales.map((code) => [code, absoluteUrl(localizePath(code, path))]),
  );

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": absoluteUrl(localizePath("es", path)),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: localeToOg(locale),
      type: "website",
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: tSite(site.description, locale),
    areaServed: tSite(site.country, locale),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: site.whatsapp,
        availableLanguage: ["Spanish", "Portuguese"],
        hoursAvailable: site.supportHours,
      },
    ],
  };
}

export function productJsonLd(product: Product, locale: Locale) {
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: productDescription(product, locale),
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: product.id,
  };

  if (product.image) {
    json.image = [absoluteUrl(product.image)];
  }

  return json;
}

export function categoryMetadata(
  category: Category,
  locale: Locale,
): Metadata {
  return createMetadata({
    title: categoryName(category, locale),
    description: categoryDescription(category, locale),
    path: `/categoria/${category.slug}`,
    image: category.image,
    locale,
  });
}

export function groupMetadata(group: ProductGroup, locale: Locale): Metadata {
  return createMetadata({
    title: groupName(group, locale),
    description: groupDescription(group, locale),
    path: `/categoria/${group.id}`,
    locale,
  });
}

export function productMetadata(product: Product, locale: Locale): Metadata {
  return createMetadata({
    title: product.name,
    description: productDescription(product, locale),
    path: `/produto/${product.slug}`,
    image: product.image ?? defaultOg,
    locale,
  });
}
