import type { LocalizedString } from "@/data/site";
import type { Locale } from "@/i18n/config";

export type ProductGroup = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  /** Slugs tecnicos em products.categorySlug — vazio = categoria reservada. */
  categorySlugs: string[];
  sortOrder: number;
};

/** Taxonomia principal de navegacao (Home, Produtos e /categoria/[slug]). */
export const productGroups: ProductGroup[] = [
  {
    id: "vitaminas-suplementos",
    name: {
      es: "Vitaminas y Suplementos",
      pt: "Vitaminas e Suplementos",
    },
    description: {
      es: "Vitaminas y suplementos para tu rutina.",
      pt: "Vitaminas e suplementos para sua rotina.",
    },
    categorySlugs: [],
    sortOrder: 1,
  },
  {
    id: "estetica",
    name: {
      es: "Estética",
      pt: "Estética",
    },
    description: {
      es: "Linea estetica y productos de cuidado avanzado.",
      pt: "Linha estetica e produtos de cuidado avancado.",
    },
    categorySlugs: ["estetica"],
    sortOrder: 2,
  },
  {
    id: "hormonios",
    name: {
      es: "Hormonas",
      pt: "Hormônios",
    },
    description: {
      es: "Soporte hormonal. Confirmamos lote por WhatsApp.",
      pt: "Suporte hormonal. Confirmamos lote pelo WhatsApp.",
    },
    categorySlugs: ["hormonios"],
    sortOrder: 3,
  },
  {
    id: "anabolizantes",
    name: {
      es: "Anabolizantes",
      pt: "Anabolizantes",
    },
    description: {
      es: "Linea anabolica con stock rotativo.",
      pt: "Linha anabolica com estoque rotativo.",
    },
    categorySlugs: ["anabolizantes"],
    sortOrder: 4,
  },
  {
    id: "emagrecedores",
    name: {
      es: "Adelgazantes",
      pt: "Emagrecedores",
    },
    description: {
      es: "Opciones para corte y control de peso.",
      pt: "Opcoes para corte e controle de peso.",
    },
    categorySlugs: ["emagrecedores"],
    sortOrder: 5,
  },
  {
    id: "perfumaria",
    name: {
      es: "Perfumería",
      pt: "Perfumaria",
    },
    description: {
      es: "Fragancias y perfumeria seleccionada.",
      pt: "Fragrancias e perfumaria selecionada.",
    },
    categorySlugs: [],
    sortOrder: 6,
  },
  {
    id: "cosmeticos",
    name: {
      es: "Cosméticos",
      pt: "Cosméticos",
    },
    description: {
      es: "Dermocosmetica y cuidado de la piel.",
      pt: "Dermocosmetica e cuidados com a pele.",
    },
    categorySlugs: ["cosmeticos"],
    sortOrder: 7,
  },
];

/**
 * Rotas legadas → grupo atual (redirect em /categoria/[slug]).
 * Revisado para a arvore de 7 categorias.
 */
export const productGroupIdAliases: Record<string, string> = {
  "controle-peso": "emagrecedores",
  performance: "anabolizantes",
  esteroide: "anabolizantes",
  suplementos: "vitaminas-suplementos",
  outros: "vitaminas-suplementos",
  "saude-bem-estar": "vitaminas-suplementos",
};

export function resolveProductGroupId(id: string): string {
  return productGroupIdAliases[id] ?? id;
}

export function groupName(group: ProductGroup, locale: Locale): string {
  return group.name[locale] ?? group.name.es;
}

export function groupDescription(group: ProductGroup, locale: Locale): string {
  return group.description[locale] ?? group.description.es;
}

export function getProductGroupById(id: string): ProductGroup | undefined {
  const resolved = resolveProductGroupId(id);
  return productGroups.find((g) => g.id === resolved);
}

export function getAllProductGroups(): ProductGroup[] {
  return [...productGroups].sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Slugs de rota para SSG (grupos + aliases legados). */
export function getAllCategoryRouteSlugs(): string[] {
  const groupIds = productGroups.map((g) => g.id);
  const aliases = Object.keys(productGroupIdAliases);
  return [...new Set([...groupIds, ...aliases])];
}

export function getGroupCategorySlugs(groupId: string): string[] {
  return getProductGroupById(groupId)?.categorySlugs ?? [];
}

export function getGroupIdForCategorySlug(categorySlug: string): string | undefined {
  const direct = productGroups.find((g) =>
    g.categorySlugs.includes(categorySlug),
  )?.id;
  if (direct) return direct;
  if (categorySlug === "esteroide") return "anabolizantes";
  return undefined;
}