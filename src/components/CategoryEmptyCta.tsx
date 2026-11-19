"use client";

import { site } from "@/data/site";
import { useLocale } from "@/components/LocaleProvider";

export function CategoryEmptyCta() {
  const { dictionary } = useLocale();
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="rounded-2xl border border-dashed border-border bg-brand-light px-4 py-10 text-center sm:px-8 sm:py-12">
      <p className="text-sm leading-relaxed text-foreground sm:text-base">
        {dictionary.categoryPage.comingSoon}
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-brand-green px-5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(18,168,58,0.28)] transition hover:bg-brand-green-dark"
      >
        {dictionary.categoryPage.comingSoonWhatsapp}
      </a>
    </div>
  );
}