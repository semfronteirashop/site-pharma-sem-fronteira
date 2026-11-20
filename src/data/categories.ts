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

/** Categorias principais alinhadas a productGroups (fallback de rota /categoria/[slug]). */
export const categories: Category[] = [
  {
    id: "cat-vitaminas-suplementos",
    name: {
      es: "Vitaminas y Suplementos",
      pt: "Vitaminas e Suplementos",
    },
    slug: "vitaminas-suplementos",
    description: {
      es: "Vitaminas y suplementos para tu rutina.",
      pt: "Vitaminas e suplementos para sua rotina.",
    },
    image: "/categories/orales.svg",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "cat-estetica",
    name: {
      es: "Estética",
      pt: "Estética",
    },
    slug: "estetica",
    description: {
      es: "Linea estetica y productos de cuidado avanzado.",
      pt: "Linha estetica e produtos de cuidado avancado.",
    },
    image: "/categories/combos.svg",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "cat-hormonios",
    name: {
      es: "Hormonas",
      pt: "Hormônios",
    },
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
    sortOrder: 4,
  },
  {
    id: "cat-emagrecedores",
    name: {
      es: "Adelgazantes",
      pt: "Emagrecedores",
    },
    slug: "emagrecedores",
    description: {
      es: "Opciones para corte y control de peso.",
      pt: "Opcoes para corte e controle de peso.",
    },
    image: "/categories/emagrecedores.svg",
    featured: true,
    sortOrder: 5,
  },
  {
    id: "cat-perfumaria",
    name: {
      es: "Perfumería",
      pt: "Perfumaria",
    },
    slug: "perfumaria",
    description: {
      es: "Fragancias y perfumeria seleccionada.",
      pt: "Fragrancias e perfumaria selecionada.",
    },
    image: "/categories/combos.svg",
    featured: true,
    sortOrder: 6,
  },
  {
    id: "cat-cosmeticos",
    name: {
      es: "Cosméticos",
      pt: "Cosméticos",
    },
    slug: "cosmeticos",
    description: {
      es: "Dermocosmetica y cuidado de la piel.",
      pt: "Dermocosmetica e cuidados com a pele.",
    },
    image: "/categories/combos.svg",
    featured: true,
    sortOrder: 7,
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