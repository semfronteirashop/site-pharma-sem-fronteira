import { site } from "@/data/site";
import { defaultLocale, localeToNumberFormat, type Locale } from "@/i18n/config";

export function formatPrice(
  value: number | undefined,
  locale: Locale = defaultLocale,
): string {
  if (typeof value !== "number") return "";
  const numberLocale = locale === "pt" ? "pt-BR" : localeToNumberFormat(locale);
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: site.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function discountPercent(
  price: number | undefined,
  originalPrice?: number,
): number | null {
  if (typeof price !== "number") return null;
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
