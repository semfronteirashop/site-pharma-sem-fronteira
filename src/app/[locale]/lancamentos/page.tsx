import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { FadeInSection } from "@/components/FadeInSection";
import { SectionHeading } from "@/components/SectionHeading";
import { sculptraLaunchBanner } from "@/data/promoBanners";
import { getNewLaunches } from "@/lib/catalog";
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
    title: dictionary.launchesPage.title,
    description: dictionary.launchesPage.meta,
    path: "/lancamentos",
    locale,
  });
}

export default async function LaunchesPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dictionary = getDictionary(raw as Locale);
  const products = getNewLaunches();

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
      <FadeInSection>
        <PromoBanner
          banner={sculptraLaunchBanner}
          variant="hero"
          priority
          className="mb-5 sm:mb-6"
        />
        <SectionHeading
          title={dictionary.launchesPage.title}
          description={dictionary.launchesPage.lead}
        />
        <ProductGrid
          products={products}
          variant="launch"
          emptyMessage={dictionary.launchesPage.empty}
          emptyHint={dictionary.launchesPage.emptyHint}
        />
      </FadeInSection>
    </div>
  );
}
