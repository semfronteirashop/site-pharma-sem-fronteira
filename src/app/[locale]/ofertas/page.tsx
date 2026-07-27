import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
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
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <SectionHeading
        title={dictionary.offersPage.title}
        description={dictionary.offersPage.lead}
        href="/produtos"
        linkLabel={dictionary.home.catalog}
      />
      <ProductGrid
        products={products}
        emptyMessage={dictionary.offersPage.empty}
      />
    </div>
  );
}
