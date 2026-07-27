import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/catalog";
import { categoryMetadata } from "@/lib/seo";
import { categoryDescription, categoryName } from "@/data/categories";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllCategories().map((category) => ({
      locale,
      slug: category.slug,
    })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return categoryMetadata(category, raw as Locale);
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <SectionHeading
        title={categoryName(category, locale)}
        description={categoryDescription(category, locale)}
        href="/produtos"
        linkLabel={dictionary.categoryPage.back}
      />
      <ProductGrid
        products={products}
        emptyMessage={dictionary.categoryPage.empty}
      />
    </div>
  );
}
