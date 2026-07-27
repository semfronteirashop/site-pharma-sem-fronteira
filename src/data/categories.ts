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
    id: "cat-orales",
    name: { es: "Orales", pt: "Orais" },
    slug: "orales",
    description: {
      es: "Comprimidos y capsulas listos para pedido.",
      pt: "Comprimidos e capsulas prontos para pedido.",
    },
    image: "/categories/orales.svg",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "cat-inyectables",
    name: { es: "Inyectables", pt: "Injetaveis" },
    slug: "inyectables",
    description: {
      es: "Linea inyectable con stock rotativo.",
      pt: "Linha injetavel com estoque rotativo.",
    },
    image: "/categories/inyectables.svg",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "cat-hormonios",
    name: { es: "Hormonios", pt: "Hormonios" },
    slug: "hormonios",
    description: {
      es: "Soporte hormonal. Confirmamos lote por WhatsApp.",
      pt: "Suporte hormonal. Confirmamos lote pelo WhatsApp.",
    },
    image: "/categories/hormonios.svg",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "cat-combos",
    name: { es: "Combos", pt: "Combos" },
    slug: "combos",
    description: {
      es: "Kits armados para bajar el costo por producto.",
      pt: "Kits montados para baixar o custo por produto.",
    },
    image: "/categories/combos.svg",
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
