import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { FadeInSection } from "@/components/FadeInSection";
import { SectionHeading } from "@/components/SectionHeading";
import { getSaleProducts } from "@/lib/catalog";
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
    title: dictionary.offersPage.title,
    description: dictionary.offersPage.meta,
    path: "/ofertas",
    locale,
  });
}

export default async function OffersPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dictionary = getDictionary(raw as Locale);
  const products = getSaleProducts();

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
      <FadeInSection>
        <SectionHeading
          title={dictionary.offersPage.title}
          description={dictionary.offersPage.lead}
        />
        <ProductGrid
          products={products}
          variant="offer"
          emptyMessage={dictionary.offersPage.empty}
        />
      </FadeInSection>
    </div>
  );
}
