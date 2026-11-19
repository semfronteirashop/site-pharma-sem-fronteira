import { notFound, redirect } from "next/navigation";
import { CategoryEmptyCta } from "@/components/CategoryEmptyCta";
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
  resolveProductGroupId,
} from "@/data/productGroups";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getProductsByGroupId,
} from "@/lib/catalog";
import { categoryMetadata, groupMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

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

  const resolved = resolveProductGroupId(slug);
  const group = getProductGroupById(resolved);
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

  const resolvedGroupId = resolveProductGroupId(slug);
  if (resolvedGroupId !== slug) {
    redirect(localizePath(locale, `/categoria/${resolvedGroupId}`));
  }

  const group = getProductGroupById(slug);
  if (group) {
    const products = getProductsByGroupId(group.id);

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <SectionHeading
          title={groupName(group, locale)}
          description={groupDescription(group, locale)}
          href="/produtos"
          linkLabel={dictionary.categoryPage.back}
        />
        {products.length === 0 ? (
          <CategoryEmptyCta />
        ) : (
          <ProductGrid
            products={products}
            emptyMessage={dictionary.categoryPage.empty}
          />
        )}
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
      {products.length === 0 ? (
        <CategoryEmptyCta />
      ) : (
        <ProductGrid
          products={products}
          emptyMessage={dictionary.categoryPage.empty}
        />
      )}
    </div>
  );
}