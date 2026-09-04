import { notFound } from "next/navigation";
import { FadeInSection } from "@/components/FadeInSection";
import { site } from "@/data/site";
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
    title: dictionary.termsPage.title,
    description: dictionary.termsPage.meta,
    path: "/termos",
    locale,
  });
}

export default async function TermsPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dictionary = getDictionary(raw as Locale);
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <FadeInSection>
        <h1 className="text-3xl font-extrabold text-brand-purple">
          {dictionary.termsPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {dictionary.termsPage.lead}
        </p>

        <div className="mt-8 space-y-4">
          {dictionary.termsPage.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-xl border border-border bg-brand-white p-5"
            >
              <h2 className="text-lg font-bold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-6 rounded-xl border border-border bg-brand-light p-4 text-sm leading-relaxed text-foreground/85">
          {dictionary.termsPage.legalNotice}
        </p>

        <div className="mt-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-brand-green px-5 text-sm font-bold text-white hover:bg-brand-green-dark"
          >
            {dictionary.termsPage.ctaWhatsapp}
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}
