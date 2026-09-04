"use client";

import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";

type SectionHeadingProps = {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  accent?: boolean;
};

export function SectionHeading({
  title,
  description,
  href,
  linkLabel,
  accent = false,
}: SectionHeadingProps) {
  const { href: localeHref, dictionary } = useLocale();

  return (
    <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:items-end sm:gap-4">
      <div className="min-w-0">
        <h2
          className={`text-lg font-extrabold tracking-tight sm:text-xl md:text-2xl ${
            accent ? "text-brand-purple" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-muted sm:mt-1 sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <AppLink
          href={localeHref(href)}
          className="shrink-0 pt-0.5 text-xs font-semibold text-brand-purple hover:text-brand-purple-hover hover:underline sm:text-sm"
        >
          {linkLabel ?? dictionary.home.seeAll}
        </AppLink>
      ) : null}
    </div>
  );
}
