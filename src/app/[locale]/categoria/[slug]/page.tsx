import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import {
  categoryDescription,
  categoryName,
} from "@/data/categories";
import {
  groupDescription,
  groupName,
  getAllCategoryRouteSlugs,
  getProductGroupById,
} from "@/data/productGroups";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getProductsByGroupId,
} from "@/lib/catalog";
import { categoryMetadata, groupMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

type Params = Promise<{ locale: string; slug: string }>;

/** Rotas principais (grupos) + aliases legados para links antigos. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllCategoryRouteSlugs().map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;

  const group = getProductGroupById(slug);
  if (group) return groupMetadata(group, locale);

  const category = getCategoryBySlug(slug);
  if (category) return categoryMetadata(category, locale);

  return {};
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  const group = getProductGroupById(slug);
  if (group) {
    const products = getProductsByGroupId(group.id);
    const isEmpty = group.categorySlugs.length === 0;

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <SectionHeading
          title={groupName(group, locale)}
          description={groupDescription(group, locale)}
          href="/produtos"
          linkLabel={dictionary.categoryPage.back}
        />
        <ProductGrid
          products={products}
          emptyMessage={dictionary.categoryPage.empty}
          emptyHint={
            isEmpty || products.length === 0
              ? dictionary.categoryPage.emptyHint
              : undefined
          }
        />
      </div>
    );
  }

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
        emptyHint={
          products.length === 0 ? dictionary.categoryPage.emptyHint : undefined
        }
      />
    </div>
  );
}
