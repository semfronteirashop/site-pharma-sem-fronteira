import { notFound } from "next/navigation";
import { AppLink } from "@/components/AppLink";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import { ProductDetailGallery } from "@/components/ProductDetailGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductMobileBuyBar } from "@/components/ProductMobileBuyBar";
import { SectionHeading } from "@/components/SectionHeading";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog";
import {
  getProductGroupById,
  groupName,
} from "@/data/productGroups";
import { productJsonLd, productMetadata } from "@/lib/seo";
import {
  productFullDescription,
  productGroupId,
  productName,
  productQuantityLabel,
  productShortDescription,
  type Product,
} from "@/data/products";
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

function ProductBadges({
  product,
  dictionary,
}: {
  product: Product;
  dictionary: ReturnType<typeof getDictionary>;
}) {
  const badges: string[] = [];
  if (product.onSale) badges.push(dictionary.productCard.offer);
  if (product.newLaunch) badges.push(dictionary.productCard.launch);
  if (product.bestSeller) badges.push(dictionary.productCard.bestSeller);
  if (product.featured && badges.length === 0) {
    badges.push(dictionary.home.featuredTitle);
  }

  if (badges.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {badges.map((label) => (
        <span
          key={label}
          className="rounded-full bg-brand-purple/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-purple"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const name = productName(product, locale);
  const shortDescription = productShortDescription(product, locale);
  const fullDescription = productFullDescription(product, locale);
  const quantityLabel = productQuantityLabel(product);
  const groupId = productGroupId(product);
  const group = groupId ? getProductGroupById(groupId) : undefined;

  return (
    <>
      <JsonLd data={productJsonLd(product, locale)} />
      <div className="overflow-x-clip">
        <div className="mx-auto max-w-7xl px-3 py-5 pb-36 sm:px-4 sm:py-8 sm:pb-8 md:px-6">
          <nav className="mb-4 text-xs text-muted sm:mb-6 sm:text-sm">
            <AppLink
              href={localizePath(locale, "/produtos")}
              className="hover:text-brand-purple"
            >
              {dictionary.nav.products}
            </AppLink>
            <span className="mx-2">/</span>
            {group ? (
              <>
                <AppLink
                  href={localizePath(locale, `/categoria/${group.id}`)}
                  className="hover:text-brand-purple"
                >
                  {groupName(group, locale)}
                </AppLink>
                <span className="mx-2">/</span>
              </>
            ) : null}
            <span className="text-foreground">{name}</span>
          </nav>

          <div className="grid gap-5 rounded-2xl border border-border bg-brand-white p-3 sm:gap-8 sm:p-4 md:grid-cols-2 md:p-6 lg:gap-10">
            <ProductDetailGallery product={product} />

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted sm:text-sm">
                {product.brand}
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:mt-2 sm:text-3xl md:text-4xl">
                {name}
              </h1>

              {group ? (
                <p className="mt-2 text-sm text-muted">
                  {dictionary.productPage.categoryLabel}:{" "}
                  <AppLink
                    href={localizePath(locale, `/categoria/${group.id}`)}
                    className="font-semibold text-brand-purple hover:text-brand-purple-hover"
                  >
                    {groupName(group, locale)}
                  </AppLink>
                </p>
              ) : null}

              {quantityLabel ? (
                <p className="mt-1 text-sm text-muted">
                  {dictionary.productPage.quantityLabel}:{" "}
                  <span className="font-medium text-foreground">
                    {quantityLabel}
                  </span>
                </p>
              ) : null}

              <ProductBadges product={product} dictionary={dictionary} />

              <ul className="mt-4 space-y-1 text-sm text-muted sm:mt-5">
                <li>{dictionary.productPage.shipCountry}</li>
                <li>{dictionary.productPage.discreetPack}</li>
              </ul>

              <div className="mt-5 border-t border-border pt-5">
                <h2 className="text-sm font-bold text-foreground">
                  {dictionary.productPage.shortDescriptionLabel}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {shortDescription}
                </p>
              </div>

              {fullDescription ? (
                <div className="mt-5 border-t border-border pt-5">
                  <h2 className="text-sm font-bold text-foreground">
                    {dictionary.productPage.fullDescriptionLabel}
                  </h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                    {fullDescription}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 hidden md:block">
                <ProductDetailActions product={product} />
              </div>
            </div>
          </div>

          {related.length > 0 ? (
            <section className="mt-8 sm:mt-10">
              <SectionHeading
                title={dictionary.productPage.related}
                accent
              />
              <ProductGrid products={related} />
            </section>
          ) : null}
        </div>
      </div>
      <ProductMobileBuyBar product={product} />
    </>
  );
}
