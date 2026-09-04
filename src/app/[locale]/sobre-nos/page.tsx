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
    title: dictionary.aboutPage.title,
    description: dictionary.aboutPage.meta,
    path: "/sobre-nos",
    locale,
  });
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dictionary = getDictionary(raw as Locale);
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  const sections = dictionary.aboutPage.sections.map((section, index) => {
    if (index === dictionary.aboutPage.sections.length - 1) {
      return {
        title: section.title,
        body: dictionary.aboutPage.serviceBody(site.supportHours),
      };
    }
    return section;
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <FadeInSection>
        <h1 className="text-3xl font-extrabold text-brand-purple">
          {dictionary.aboutPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {dictionary.aboutPage.lead}
        </p>

        <div className="mt-8 space-y-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-xl border border-border bg-brand-white p-5"
            >
              <h2 className="text-lg font-bold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-brand-green px-5 text-sm font-bold text-white hover:bg-brand-green-dark"
          >
            {dictionary.aboutPage.ctaWhatsapp}
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}
