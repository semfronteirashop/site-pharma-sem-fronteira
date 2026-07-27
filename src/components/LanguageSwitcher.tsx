"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/paths";
import { useLocale } from "@/components/LocaleProvider";

export function LanguageSwitcher() {
  const { locale, dictionary } = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function choose(next: Locale) {
    if (next === locale) return;
    const search = searchParams.toString();
    const nextPath = `${switchLocalePath(pathname, next)}${search ? `?${search}` : ""}`;
    router.push(nextPath);
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-background p-0.5"
      role="group"
      aria-label={dictionary.language.label}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => choose(code)}
          className={`rounded-full px-2.5 py-1.5 text-xs font-bold ${
            locale === code
              ? "bg-blue text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {code === "es" ? dictionary.language.es : dictionary.language.pt}
        </button>
      ))}
    </div>
  );
}
