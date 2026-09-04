import { notFound } from "next/navigation";
import { AppLink } from "@/components/AppLink";
import { FadeInSection } from "@/components/FadeInSection";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/seo";
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
    title: dictionary.howToBuyPage.title,
    description: dictionary.howToBuyPage.meta,
    path: "/como-comprar",
    locale,
  });
}

export default async function HowToBuyPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <FadeInSection>
        <h1 className="text-3xl font-extrabold text-brand-purple">
          {dictionary.howToBuyPage.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{dictionary.howToBuyPage.lead}</p>

        <ol className="mt-8 space-y-4">
          {dictionary.howToBuyPage.steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-xl border border-border bg-brand-white p-4"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="pt-1.5 text-sm font-medium text-foreground">{step}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 rounded-xl border border-border bg-brand-light p-4 text-sm leading-relaxed text-foreground/85">
          {dictionary.howToBuyPage.legalNotice}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <AppLink
            href={localizePath(locale, "/produtos")}
            className="inline-flex h-11 items-center rounded-full bg-brand-purple px-5 text-sm font-bold text-white hover:bg-brand-purple-hover"
          >
            {dictionary.howToBuyPage.ctaProducts}
          </AppLink>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-brand-green px-5 text-sm font-bold text-white hover:bg-brand-green-dark"
          >
            {dictionary.howToBuyPage.ctaWhatsapp}
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}
