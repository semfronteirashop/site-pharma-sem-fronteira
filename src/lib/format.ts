import { site } from "@/data/site";
import { defaultLocale, localeToNumberFormat, type Locale } from "@/i18n/config";

export function formatPrice(value: number, locale: Locale = defaultLocale): string {
  return `${site.currencySymbol} ${value.toLocaleString(localeToNumberFormat(locale))}`;
}

export function discountPercent(
  price: number,
  originalPrice?: number,
): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
