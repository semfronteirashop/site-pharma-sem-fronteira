"use client";

import { site } from "@/data/site";
import { FadeInSection } from "@/components/FadeInSection";
import { useLocale } from "@/components/LocaleProvider";

function InstagramGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function InstagramBanner() {
  const { dictionary } = useLocale();
  const instagramUrl = site.instagram.url;

  return (
    <FadeInSection delayMs={220}>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dictionary.home.instagramBannerCta}
        className="instagram-banner block transition hover:brightness-[1.03]"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-3 py-6 sm:px-4 sm:py-7 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-start gap-3 md:items-center">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <InstagramGlyph />
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-white sm:text-xl md:text-2xl">
                {dictionary.home.instagramBannerTitle}
              </h2>
              <p className="mt-0.5 text-sm text-white/90">
                {dictionary.home.instagramBannerDesc}
              </p>
            </div>
          </div>
          <span className="inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-brand-purple md:w-auto">
            {dictionary.home.instagramBannerCta}
          </span>
        </div>
      </a>
    </FadeInSection>
  );
}
