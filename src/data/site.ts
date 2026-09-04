import type { Locale } from "@/i18n/config";

export type LocalizedString = Record<Locale, string>;

export const site = {
  name: "Sem Fronteira Suplementos",
  shortName: "Sem Fronteira",
  tagline: {
    es: "Catalogo de suplementos con envio a todo Paraguay.",
    pt: "Catalogo de suplementos com envio para todo o Paraguai.",
  } satisfies LocalizedString,
  description: {
    es: "Compras por WhatsApp, embalaje discreto y soporte de 08:00 a 18:00.",
    pt: "Compras pelo WhatsApp, embalagem discreta e suporte das 08:00 as 18:00.",
  } satisfies LocalizedString,
  url: "https://pharmasemfronteira.com",
  currency: "BRL",
  currencySymbol: "R$",
  whatsapp: "+595992307471",
  whatsappDisplay: "+595 992 307 471",
  supportHours: "08:00 - 18:00",
  email: "soporte@pharmasemfronteira.com",
  country: {
    es: "Paraguay",
    pt: "Paraguai",
  } satisfies LocalizedString,
  freeShippingMin: 400,
  instagram: {
    handle: "@semfronteiras.py",
    url: "https://www.instagram.com/semfronteiras.py/",
  },
} as const;

export function tSite(
  value: LocalizedString | string,
  locale: Locale,
): string {
  if (typeof value === "string") return value;
  return value[locale] ?? value.es;
}

export const navHrefs = [
  { href: "/", key: "home" as const },
  { href: "/produtos", key: "products" as const },
  { href: "/ofertas", key: "offers" as const },
  { href: "/lancamentos", key: "launches" as const },
  { href: "/mais-procurados", key: "bestSellers" as const },
] as const;

export const institutionalHrefs = [
  { href: "/sobre-nos", key: "about" as const },
  { href: "/privacidade", key: "privacy" as const },
  { href: "/termos", key: "terms" as const },
] as const;
