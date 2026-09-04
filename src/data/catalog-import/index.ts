import type {
  DuplicateCatalogIdGroup,
  SpreadsheetProductRecord,
} from "./types";
import { importedSpreadsheetProducts } from "./records";

export type { SpreadsheetProductRecord, DuplicateCatalogIdGroup } from "./types";
export { importedSpreadsheetProducts };

/** Origem dos dados importados (arquivo local usado na importacao). */
export const IMPORTED_CATALOG_SOURCE_FILE =
  "cadastro_produtos_sem_fronteira.csv.xlsx";

export const IMPORTED_CATALOG_ROW_COUNT = importedSpreadsheetProducts.length;

/** IDs da planilha que aparecem mais de uma vez (apos trim). */
export function getDuplicateCatalogIdGroups(): DuplicateCatalogIdGroup[] {
  const groups = new Map<string, SpreadsheetProductRecord[]>();

  for (const record of importedSpreadsheetProducts) {
    const key = record.catalogId.trim();
    const list = groups.get(key) ?? [];
    list.push(record);
    groups.set(key, list);
  }

  return [...groups.entries()]
    .filter(([, records]) => records.length > 1)
    .map(([catalogIdNormalized, records]) => ({
      catalogIdNormalized,
      records,
    }));
}

export function getImportedProductByImportId(
  importId: string,
): SpreadsheetProductRecord | undefined {
  return importedSpreadsheetProducts.find((r) => r.importId === importId);
}

/** Retorna todos os registros com o mesmo ID da planilha (inclui duplicatas). */
export function getImportedProductsByCatalogId(
  catalogId: string,
): SpreadsheetProductRecord[] {
  const normalized = catalogId.trim();
  return importedSpreadsheetProducts.filter(
    (r) => r.catalogId.trim() === normalized,
  );
}

export function getAllImportedProducts(): SpreadsheetProductRecord[] {
  return importedSpreadsheetProducts;
}
