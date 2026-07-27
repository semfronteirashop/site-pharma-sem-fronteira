import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchForm } from "@/components/SearchForm";
import { SectionHeading } from "@/components/SectionHeading";
import { searchProducts } from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{ q?: string }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const { q } = await searchParams;
  const query = q?.trim();

  return createMetadata({
    title: query ? dictionary.searchPage.resultsFor(query) : dictionary.searchPage.title,
    description: query
      ? dictionary.searchPage.metaFor(query)
      : dictionary.searchPage.meta,
    path: query ? `/busca?q=${encodeURIComponent(query)}` : "/busca",
    noIndex: true,
    locale,
  });
}

export default async function SearchPage({
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
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchProducts(query, locale) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <SectionHeading
        title={
          query
            ? dictionary.searchPage.resultsFor(query)
            : dictionary.searchPage.title
        }
        description={
          query
            ? dictionary.searchPage.count(results.length)
            : dictionary.searchPage.hint
        }
      />
      <div className="mb-6 max-w-xl">
        <SearchForm initialQuery={query} autoFocus />
      </div>
      {query ? (
        <ProductGrid
          products={results}
          emptyMessage={dictionary.searchPage.empty}
        />
      ) : null}
    </div>
  );
}
