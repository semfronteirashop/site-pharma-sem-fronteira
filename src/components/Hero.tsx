"use client";

import { site } from "@/data/site";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";

export function Hero() {
  const { dictionary, href } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-3 pt-3 sm:px-4 sm:pt-6 md:px-6 md:pt-8">
      <div className="relative overflow-hidden rounded-2xl bg-blue px-5 py-8 text-white sm:rounded-[28px] sm:px-8 sm:py-12 md:px-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, rgba(45,212,168,0.45), transparent 40%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15), transparent 35%)",
          }}
          aria-hidden
        />

        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold text-teal sm:text-sm">
            {dictionary.brandSubtitle}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:mt-3 sm:text-4xl md:text-5xl lg:text-6xl">
            Sem Fronteira
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-4 sm:text-base md:text-lg">
            {dictionary.home.heroLead(site.supportHours)}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <AppLink
              href={href("/produtos")}
              prefetch
              className="inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 text-sm font-bold text-foreground hover:bg-teal-hover"
            >
              {dictionary.home.heroCtaProducts}
            </AppLink>
            <AppLink
              href={href("/ofertas")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white hover:bg-white/10"
            >
              {dictionary.home.heroCtaOffers}
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
