import { notFound } from "next/navigation";
import { AppLink } from "@/components/AppLink";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/seo";
import { buildSupportMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return createMetadata({
    title: dictionary.helpPage.title,
    description: dictionary.helpPage.meta,
    path: "/autenticidade",
    locale,
  });
}

export default async function AuthenticityPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const supportUrl = buildWhatsAppUrl(
    buildSupportMessage(locale, dictionary.whatsappMsg.defaultTopic),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <h1 className="text-3xl font-extrabold">{dictionary.helpPage.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {dictionary.helpPage.lead(site.supportHours)}
      </p>

      <div className="mt-8 space-y-4">
        <article className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">
            {dictionary.helpPage.companyTitle}
          </h2>
          <p className="mt-2 text-sm text-foreground/85">
            {dictionary.helpPage.companyBody(site.name)}
          </p>
        </article>

        <article className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">{dictionary.helpPage.authTitle}</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-foreground/85">
            {dictionary.helpPage.authSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold">
            {dictionary.helpPage.shippingTitle}
          </h2>
          <p className="mt-2 text-sm text-foreground/85">
            {dictionary.helpPage.shippingBody}
          </p>
        </article>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={supportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-lg bg-whatsapp px-5 text-sm font-bold text-white"
        >
          {dictionary.helpPage.talkWhatsapp}
        </a>
        <AppLink
          href={localizePath(locale, "/produtos")}
          className="inline-flex h-11 items-center rounded-lg border border-border bg-surface px-5 text-sm font-bold"
        >
          {dictionary.helpPage.seeProducts}
        </AppLink>
      </div>
    </div>
  );
}
