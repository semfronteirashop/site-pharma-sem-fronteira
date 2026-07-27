export const locales = ["es", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
export const localeCookie = "sf_locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeToOg(locale: Locale): string {
  return locale === "pt" ? "pt_BR" : "es_PY";
}

export function localeToNumberFormat(locale: Locale): string {
  return locale === "pt" ? "pt-BR" : "es-PY";
}
