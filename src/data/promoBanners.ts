import type { LocalizedString } from "@/data/site";
import type { Locale } from "@/i18n/config";

export type PromoBanner = {
  id: string;
  image: string;
  alt: LocalizedString;
  href: string;
  /** Largura nativa do arquivo original em public/. */
  width: number;
  /** Altura nativa do arquivo original em public/. */
  height: number;
};

export const sculptraLaunchBanner: PromoBanner = {
  id: "sculptra-lancamento",
  image: "/banners/sculptra-lancamento.jpg",
  alt: {
    pt: "Sculptra — Lancamento",
    es: "Sculptra — Lanzamiento",
  },
  href: "/lancamentos",
  width: 1024,
  height: 310,
};

export const orfoglipLineBanner: PromoBanner = {
  id: "orfoglip-linha",
  image: "/banners/orfoglip-linha.jpg",
  alt: {
    pt: "Toda linha de Orfoglip — confira e aproveite",
    es: "Toda la linea de Orfoglip — aprovecha",
  },
  href: "/categoria/emagrecedores",
  width: 1024,
  height: 384,
};

/** Slides do carrossel Hero da Home (ordem de exibicao). */
export const homeHeroBanners: PromoBanner[] = [
  sculptraLaunchBanner,
  orfoglipLineBanner,
];

export function promoBannerAlt(banner: PromoBanner, locale: Locale): string {
  return banner.alt[locale] ?? banner.alt.es;
}
