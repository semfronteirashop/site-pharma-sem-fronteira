import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { site, tSite } from "@/data/site";
import {
  getBestSellers,
  getFeaturedCategories,
  getFeaturedProducts,
  getSaleProducts,
} from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;

  return createMetadata({
    title: site.name,
    description: `${tSite(site.tagline, locale)} ${tSite(site.description, locale)}`,
    path: "/",
    locale,
  });
}

export default async function HomePage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  const categories = getFeaturedCategories();
  const featured = getFeaturedProducts().slice(0, 8);
  const bestSellers = getBestSellers().slice(0, 8);
  const offers = getSaleProducts().slice(0, 8);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
        <SectionHeading
          title={dictionary.home.categoriesTitle}
          description={dictionary.home.categoriesDesc}
          href="/produtos#categorias"
          linkLabel={dictionary.home.seeAll}
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
          <SectionHeading
            title={dictionary.home.featuredTitle}
            description={dictionary.home.featuredDesc}
            href="/produtos"
            linkLabel={dictionary.home.catalog}
          />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
        <SectionHeading
          title={dictionary.home.bestSellersTitle}
          href="/mas-vendidos"
          linkLabel={dictionary.home.seeRanking}
        />
        <ProductGrid products={bestSellers} />
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
          <SectionHeading
            title={dictionary.home.offersTitle}
            description={dictionary.home.offersDesc}
            href="/ofertas"
            linkLabel={dictionary.home.seeOffers}
          />
          <ProductGrid products={offers} />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-6 sm:px-4 sm:py-8 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <h2 className="text-lg font-extrabold md:text-xl">
              {dictionary.home.authTitle}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {dictionary.home.authDesc(site.supportHours)}
            </p>
          </div>
          <Link
            href={localizePath(locale, "/autenticidade")}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-blue px-5 text-sm font-bold text-white hover:bg-blue-hover md:w-auto"
          >
            {dictionary.home.howToAuth}
          </Link>
        </div>
      </section>
    </>
  );
}
