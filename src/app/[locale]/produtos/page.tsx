import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { SearchForm } from "@/components/SearchForm";
import {
  getAllCategories,
  getAllProducts,
  getBrands,
} from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { categoryName } from "@/data/categories";

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{ brand?: string; category?: string }>;

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

  const categories = getAllCategories();
  const brands = getBrands();
  let products = getAllProducts();

  if (query.category) {
    products = products.filter((p) => p.categorySlug === query.category);
  }
  if (query.brand) {
    products = products.filter(
      (p) => p.brand.toLowerCase() === query.brand?.toLowerCase(),
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-8 md:px-6">
      <SectionHeading
        title={dictionary.productsPage.title}
        description={dictionary.productsPage.results(products.length)}
      />

      <div className="mb-5 space-y-3 sm:mb-6">
        <div className="hidden sm:block">
          <SearchForm />
        </div>
        <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <FilterChip
            href={localizePath(locale, "/produtos")}
            label={dictionary.productsPage.all}
            active={!query.category && !query.brand}
          />
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              href={`${localizePath(locale, "/produtos")}?category=${category.slug}`}
              label={categoryName(category, locale)}
              active={query.category === category.slug}
            />
          ))}
          {brands.map((brand) => (
            <FilterChip
              key={brand}
              href={`${localizePath(locale, "/produtos")}?brand=${encodeURIComponent(brand)}`}
              label={brand}
              active={query.brand === brand}
            />
          ))}
        </div>
      </div>

      <ProductGrid
        products={products}
        emptyMessage={dictionary.productsPage.emptyFilter}
      />

      <section id="categorias" className="mt-10 scroll-mt-28 sm:mt-12">
        <SectionHeading title={dictionary.productsPage.categoriesTitle} />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
        active
          ? "bg-teal text-foreground"
          : "border border-border bg-surface text-foreground hover:border-teal"
      }`}
    >
      {label}
    </Link>
  );
}
