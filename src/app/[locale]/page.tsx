import { InstagramBanner } from "@/components/InstagramBanner";
import { InstagramSection } from "@/components/InstagramSection";
import { Hero } from "@/components/Hero";
import { FadeInSection } from "@/components/FadeInSection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductGroupCard } from "@/components/ProductGroupCard";
import { SectionHeading } from "@/components/SectionHeading";
import { site, tSite } from "@/data/site";
import {
  getBestSellers,
  getNewLaunches,
  getSaleProducts,
  getVisibleProductGroups,
} from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string }>;

const sectionShell = "mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-7";

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

  const groups = getVisibleProductGroups();
  const bestSellers = getBestSellers().slice(0, 8);
  const offers = getSaleProducts().slice(0, 8);
  const launches = getNewLaunches().slice(0, 8);
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="overflow-x-clip">
      <Hero />

      <FadeInSection className="bg-brand-light" delayMs={60}>
        <div className={sectionShell}>
          <SectionHeading
            title={dictionary.home.categoriesTitle}
            description={dictionary.home.categoriesDesc}
            href="/produtos"
            linkLabel={dictionary.home.seeAll}
            accent
          />
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-3 lg:grid-cols-4 lg:gap-3">
            {groups.map((group) => (
              <ProductGroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection delayMs={90}>
        <div className={sectionShell}>
          <SectionHeading
            title={dictionary.home.offersTitle}
            description={dictionary.home.offersDesc}
            href="/ofertas"
            linkLabel={dictionary.home.seeOffers}
            accent
          />
          <ProductCarousel
            products={offers}
            emptyMessage={dictionary.offersPage.empty}
          />
        </div>
      </FadeInSection>

      <FadeInSection className="bg-brand-light" delayMs={120}>
        <div className={sectionShell}>
          <SectionHeading
            title={dictionary.bestSellersPage.title}
            description={dictionary.bestSellersPage.lead}
            href="/mais-procurados"
            linkLabel={dictionary.home.seeRanking}
            accent
          />
          <ProductCarousel products={bestSellers} />
        </div>
      </FadeInSection>

      <FadeInSection delayMs={150}>
        <div className={sectionShell}>
          <SectionHeading
            title={dictionary.home.launchesTitle}
            description={dictionary.home.launchesDesc}
            href="/lancamentos"
            linkLabel={dictionary.home.seeLaunches}
            accent
          />
          <ProductCarousel
            products={launches}
            emptyMessage={dictionary.launchesPage.empty}
          />
        </div>
      </FadeInSection>

      <InstagramSection />

      <InstagramBanner />

      <FadeInSection className="bg-brand-purple" delayMs={260}>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-3 py-6 sm:px-4 sm:py-7 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <h2 className="text-lg font-extrabold text-white sm:text-xl md:text-2xl">
              {dictionary.home.whatsappCta}
            </h2>
            <p className="mt-0.5 text-sm text-white/85">
              {dictionary.home.whatsappCtaDesc} {site.supportHours}
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-brand-green px-6 text-sm font-bold text-white hover:bg-brand-green-dark md:w-auto"
          >
            {dictionary.whatsapp}
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}
