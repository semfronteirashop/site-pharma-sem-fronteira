import { notFound } from "next/navigation";
import { FadeInSection } from "@/components/FadeInSection";
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
      <FadeInSection>
        <h1 className="text-3xl font-extrabold text-brand-purple">
          {dictionary.privacyPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {dictionary.privacyPage.lead}
        </p>

        <div className="mt-8 space-y-4">
          {dictionary.privacyPage.sections.map((section) => (
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

          <section className="rounded-xl border border-border bg-brand-white p-5">
            <h2 className="text-lg font-bold">
              {dictionary.privacyPage.contactTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              {dictionary.privacyPage.contactBody(
                site.email,
                site.supportHours,
              )}
            </p>
          </section>
        </div>
      </FadeInSection>
    </div>
  );
}
