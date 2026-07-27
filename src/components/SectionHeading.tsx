"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

type SectionHeadingProps = {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({
  title,
  description,
  href,
  linkLabel,
}: SectionHeadingProps) {
  const { href: localeHref, dictionary } = useLocale();

  return (
    <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5 sm:items-end sm:gap-4">
      <div className="min-w-0">
        <h2 className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl md:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-xs text-muted sm:text-sm">{description}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={localeHref(href)}
          className="shrink-0 pt-0.5 text-xs font-semibold text-teal-deep hover:underline sm:text-sm"
        >
          {linkLabel ?? dictionary.home.seeAll}
        </Link>
      ) : null}
    </div>
  );
}
