import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return createMetadata({
    title: dictionary.privacyPage.title,
    description: dictionary.privacyPage.meta,
    path: "/privacidade",
    locale,
  });
}

export default async function PrivacyPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dictionary = getDictionary(raw as Locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <h1 className="text-3xl font-extrabold">{dictionary.privacyPage.title}</h1>
      <div className="mt-8 space-y-7 text-sm leading-relaxed text-foreground/85">
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">
            {dictionary.privacyPage.privacyTitle}
          </h2>
          <p className="mt-2">{dictionary.privacyPage.privacyBody}</p>
        </section>
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">
            {dictionary.privacyPage.termsTitle}
          </h2>
          <p className="mt-2">{dictionary.privacyPage.termsBody}</p>
        </section>
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">
            {dictionary.privacyPage.shippingTitle}
          </h2>
          <p className="mt-2">{dictionary.privacyPage.shippingBody}</p>
        </section>
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">
            {dictionary.privacyPage.refundsTitle}
          </h2>
          <p className="mt-2">
            {dictionary.privacyPage.refundsBody(site.supportHours)}
          </p>
        </section>
      </div>
    </div>
  );
}
