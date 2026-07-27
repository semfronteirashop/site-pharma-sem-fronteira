import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/CheckoutClient";
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
    title: dictionary.checkoutPage.title,
    description: dictionary.checkoutPage.meta,
    path: "/checkout",
    noIndex: true,
    locale,
  });
}

export default async function CheckoutPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dictionary = getDictionary(raw as Locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-extrabold md:text-3xl">
        {dictionary.checkoutPage.title}
      </h1>
      <p className="mt-2 text-sm text-muted">{dictionary.checkoutPage.lead}</p>
      <div className="mt-6">
        <CheckoutClient />
      </div>
    </div>
  );
}
