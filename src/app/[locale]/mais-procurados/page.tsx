import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { FadeInSection } from "@/components/FadeInSection";
import { SectionHeading } from "@/components/SectionHeading";
import { getBestSellers } from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return createMetadata({
    title: dictionary.bestSellersPage.title,
    description: dictionary.bestSellersPage.meta,
    path: "/mais-procurados",
    locale,
  });
}

export default async function MostPopularPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dictionary = getDictionary(raw as Locale);
  const products = getBestSellers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <FadeInSection>
        <SectionHeading
          title={dictionary.bestSellersPage.title}
          description={dictionary.bestSellersPage.lead}
          href="/produtos"
          linkLabel={dictionary.home.catalog}
        />
        <ProductGrid products={products} />
      </FadeInSection>
    </div>
  );
}
