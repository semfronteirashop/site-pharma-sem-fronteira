/**
 * Registro fiel a uma linha da planilha oficial de cadastro.
 * Campos opcionais permanecem ausentes (null) quando vazios na planilha.
 */
export type SpreadsheetProductRecord = {
  /** Numero da linha na aba Produtos (referencia de auditoria). */
  sheetRow: number;
  /** Valor exato da coluna "ID do produto" (pode conter espacos; pode repetir). */
  catalogId: string;
  /** Identificador interno unico no projeto (catalogId + linha quando houver duplicidade). */
  importId: string;
  nomeDoProduto: string | null;
  marca: string | null;
  categoria: string | null;
  grupo: string | null;
  preco: number | null;
  moeda: string | null;
  disponivelEstoque: string | number | null;
  imagemPrincipal: string | null;
  imagensAdicionais: string | null;
  descricaoCurta: string | null;
  descricaoCompleta: string | null;
  destaque: string | null;
  lancamento: string | null;
  maisProcurado: string | null;
  informacoesAdicionais: string | null;
};

export type DuplicateCatalogIdGroup = {
  catalogIdNormalized: string;
  records: SpreadsheetProductRecord[];
};
