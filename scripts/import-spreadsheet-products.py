#!/usr/bin/env python3
"""Regenera src/data/catalog-import/records.ts a partir da planilha oficial."""

from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

try:
    import openpyxl
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "openpyxl required: pip install openpyxl"
    ) from exc

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_XLSX = Path.home() / "Downloads" / "cadastro_produtos_sem_fronteira.csv.xlsx"
OUT_FILE = ROOT / "src" / "data" / "catalog-import" / "records.ts"

COLUMNS = [
    ("catalogId", "ID do produto"),
    ("nomeDoProduto", "Nome do produto"),
    ("marca", "Marca"),
    ("categoria", "Categoria"),
    ("grupo", "Grupo"),
    ("preco", "Preço"),
    ("moeda", "Moeda"),
    ("disponivelEstoque", "Disponível / Estoque"),
    ("imagemPrincipal", "Imagem principal"),
    ("imagensAdicionais", "Imagens adicionais"),
    ("descricaoCurta", "Descrição curta"),
    ("descricaoCompleta", "Descrição completa"),
    ("destaque", "Destaque"),
    ("lancamento", "Lançamento"),
    ("maisProcurado", "Mais procurado"),
    ("informacoesAdicionais", "Informações adicionais"),
]


def cell(value):
    if value is None:
        return None
    if isinstance(value, str):
        return value
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def main() -> None:
    xlsx = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_XLSX
    if not xlsx.exists():
        raise SystemExit(f"Planilha nao encontrada: {xlsx}")

    wb = openpyxl.load_workbook(xlsx, read_only=True, data_only=True)
    ws = wb["Produtos"]
    rows = list(ws.iter_rows(values_only=True))
    wb.close()

    header = rows[0]
    records: list[dict] = []

    for i, row in enumerate(rows[1:], start=2):
        if not any(c is not None for c in row):
            continue
        data = dict(zip(header, row))
        rec = {"sheetRow": i}
        for key, col in COLUMNS:
            rec[key] = cell(data.get(col))
        if rec["catalogId"] is None:
            rec["catalogId"] = ""
        records.append(rec)

    id_counts = Counter(str(r["catalogId"]).strip() for r in records)
    for rec in records:
        cid = str(rec["catalogId"]).strip() or f"ROW-{rec['sheetRow']}"
        rec["importId"] = (
            f"{cid}__row{rec['sheetRow']}" if id_counts[cid] > 1 else cid
        )

    content = (
        'import type { SpreadsheetProductRecord } from "./types";\n\n'
        "/** Gerado por scripts/import-spreadsheet-products.py — nao editar manualmente. */\n"
        "export const importedSpreadsheetProducts: SpreadsheetProductRecord[] = "
        + json.dumps(records, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT_FILE.write_text(content, encoding="utf-8")
    print(f"Importados {len(records)} registros -> {OUT_FILE}")


if __name__ == "__main__":
    main()
