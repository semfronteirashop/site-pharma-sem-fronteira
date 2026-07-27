import type { LocalizedString } from "@/data/site";
import type { Locale } from "@/i18n/config";

export type Category = {
  id: string;
  name: LocalizedString;
  slug: string;
  description: LocalizedString;
  image: string;
  featured: boolean;
  sortOrder: number;
};

export const categories: Category[] = [
  {
    id: "cat-anabolizantes",
    name: {
      es: "Anabolizantes",
      pt: "Anabolizantes",
    },
    slug: "anabolizantes",
    description: {
      es: "Linea anabolica con stock rotativo.",
      pt: "Linha anabolica com estoque rotativo.",
    },
    image: "/categories/anabolizantes.svg",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "cat-esteroide",
    name: {
      es: "Esteroide",
      pt: "Esteroide",
    },
    slug: "esteroide",
    description: {
      es: "Esteroides con lote confirmado por WhatsApp.",
      pt: "Esteroides com lote confirmado pelo WhatsApp.",
    },
    image: "/categories/esteroide.svg",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "cat-emagrecedores",
    name: {
      es: "Emagrecedores",
      pt: "Emagrecedores",
    },
    slug: "emagrecedores",
    description: {
      es: "Opciones para corte y control de peso.",
      pt: "Opcoes para corte e controle de peso.",
    },
    image: "/categories/emagrecedores.svg",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "cat-hormonios",
    name: {
      es: "Hormonios",
      pt: "Hormonios",
    },
    slug: "hormonios",
    description: {
      es: "Soporte hormonal. Confirmamos lote por WhatsApp.",
      pt: "Suporte hormonal. Confirmamos lote pelo WhatsApp.",
    },
    image: "/categories/hormonios.svg",
    featured: true,
    sortOrder: 4,
  },
];

export function categoryName(category: Category, locale: Locale): string {
  return category.name[locale] ?? category.name.es;
}

export function categoryDescription(
  category: Category,
  locale: Locale,
): string {
  return category.description[locale] ?? category.description.es;
}
