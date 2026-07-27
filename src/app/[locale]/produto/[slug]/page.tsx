import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductMobileBuyBar } from "@/components/ProductMobileBuyBar";
import { SectionHeading } from "@/components/SectionHeading";
import {
  getAllProducts,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog";
import { discountPercent, formatPrice } from "@/lib/format";
import { productJsonLd, productMetadata } from "@/lib/seo";
import { productDescription } from "@/data/products";
import { categoryName } from "@/data/categories";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProducts().map((product) => ({
      locale,
      slug: product.slug,
    })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const product = getProductBySlug(slug);
  if (!product) return {};
  return productMetadata(product, raw as Locale);
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(product);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <>
      <JsonLd data={productJsonLd(product, locale)} />
      <div className="mx-auto max-w-7xl px-3 py-5 pb-28 sm:px-4 sm:py-8 sm:pb-8 md:px-6">
        <nav className="mb-4 overflow-x-auto whitespace-nowrap text-xs text-muted no-scrollbar sm:mb-6 sm:text-sm">
          <Link
            href={localizePath(locale, "/produtos")}
            className="hover:text-blue"
          >
            {dictionary.nav.products}
          </Link>
          <span className="mx-2">/</span>
          {category ? (
            <>
              <Link
                href={localizePath(locale, `/categoria/${category.slug}`)}
                className="hover:text-blue"
              >
                {categoryName(category, locale)}
              </Link>
              <span className="mx-2">/</span>
            </>
          ) : null}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-5 rounded-2xl border border-border bg-surface p-3 sm:gap-8 sm:p-4 md:grid-cols-2 md:p-6 lg:gap-10">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-background">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-sm font-medium uppercase text-muted">
              {product.brand}
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {product.dosage} · {product.unit}
            </p>

            <div className="mt-4 flex flex-wrap items-end gap-2 sm:mt-5">
              <p className="text-2xl font-extrabold text-price sm:text-3xl">
                {formatPrice(product.price, locale)}
              </p>
              {product.originalPrice ? (
                <p className="text-base text-muted line-through">
                  {formatPrice(product.originalPrice, locale)}
                </p>
              ) : null}
              {discount ? (
                <span className="rounded-full bg-sale px-2 py-0.5 text-xs font-bold text-white">
                  -{discount}%
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:mt-5">
              {productDescription(product, locale)}
            </p>

            <ul className="mt-4 space-y-1 text-sm text-muted sm:mt-5">
              <li>
                {dictionary.productPage.stock}:{" "}
                {product.stock > 0
                  ? dictionary.productPage.inStock
                  : dictionary.productPage.outOfStock}
              </li>
              <li>{dictionary.productPage.shipCountry}</li>
              <li>{dictionary.productPage.discreetPack}</li>
            </ul>

            <div className="mt-6 hidden flex-wrap gap-3 md:flex">
              <AddToCartButton product={product} />
              <Link
                href={localizePath(locale, "/checkout")}
                className="inline-flex h-12 items-center rounded-full border border-border px-5 text-sm font-bold hover:border-blue hover:text-blue"
              >
                {dictionary.productPage.goCheckout}
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-8 sm:mt-12">
            <SectionHeading title={dictionary.productPage.related} />
            <ProductGrid products={related} />
          </section>
        ) : null}
      </div>
      <ProductMobileBuyBar product={product} />
    </>
  );
}
