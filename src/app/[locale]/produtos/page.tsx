import { notFound } from "next/navigation";
import { ProductFinder } from "@/components/ProductFinder";
import { ProductGroupCard } from "@/components/ProductGroupCard";
import { FadeInSection } from "@/components/FadeInSection";
import { SectionHeading } from "@/components/SectionHeading";
import { resolveProductGroupId } from "@/data/productGroups";
import {
  getAllProductGroups,
  getAllProducts,
  getBrands,
  getBrandsByGroupId,
  getProductGroupProductCount,
} from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{ brand?: string; group?: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return createMetadata({
    title: dictionary.productsPage.title,
    description: dictionary.productsPage.metaDescription,
    path: "/produtos",
    locale,
  });
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const query = await searchParams;

  const products = getAllProducts();
  const brands = getBrands();
  const groups = getAllProductGroups();

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
      <FadeInSection>
        <SectionHeading
          title={dictionary.productsPage.title}
          description={dictionary.productsPage.subtitle}
        />

        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg font-extrabold text-brand-purple sm:text-xl">
            {dictionary.productsPage.categoriesTitle}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
            {groups.map((group) => (
              <ProductGroupCard
                key={group.id}
                group={group}
                productCount={getProductGroupProductCount(group.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <ProductFinder
            products={products}
            brands={brands}
            brandsByGroup={{ cosmeticos: getBrandsByGroupId("cosmeticos") }}
            groups={groups}
            showHeading={false}
            showAllByDefault={false}
            browseHint={dictionary.productsPage.browseHint}
            initialGroup={resolveProductGroupId(query.group ?? "")}
            initialBrand={query.brand ?? ""}
          />
        </div>
      </FadeInSection>
    </div>
  );
}
