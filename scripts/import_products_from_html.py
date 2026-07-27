#!/usr/bin/env python3
"""Importa produtos + imagens a partir de example/list-produts.html."""

from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "example" / "list-produts.html"
OUT_IMG = ROOT / "public" / "products" / "remote"
PRODUCTS_TS = ROOT / "src" / "data" / "products.ts"
CATEGORIES_TS = ROOT / "src" / "data" / "categories.ts"
MANIFEST = ROOT / "public" / "media" / "manifest.json"
BASE = "https://pharmasemfronteira.com"
UA = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
}

CATEGORY_META = {
    "anabolizantes": {
        "es": ("Anabolizantes", "Linea anabolica con stock rotativo."),
        "pt": ("Anabolizantes", "Linha anabolica com estoque rotativo."),
        "image": "/categories/anabolizantes.svg",
        "featured": True,
        "sort": 1,
    },
    "esteroide": {
        "es": ("Esteroide", "Esteroides con lote confirmado por WhatsApp."),
        "pt": ("Esteroide", "Esteroides com lote confirmado pelo WhatsApp."),
        "image": "/categories/esteroide.svg",
        "featured": True,
        "sort": 2,
    },
    "emagrecedores": {
        "es": ("Emagrecedores", "Opciones para corte y control de peso."),
        "pt": ("Emagrecedores", "Opcoes para corte e controle de peso."),
        "image": "/categories/emagrecedores.svg",
        "featured": True,
        "sort": 3,
    },
    "hormonios": {
        "es": ("Hormonios", "Soporte hormonal. Confirmamos lote por WhatsApp."),
        "pt": ("Hormonios", "Suporte hormonal. Confirmamos lote pelo WhatsApp."),
        "image": "/categories/hormonios.svg",
        "featured": True,
        "sort": 4,
    },
}

BRAND_ALIASES = {
    "emagrecedores": "Sem Fronteira",
    "muscle-lab": "Muscle Lab",
    "zphc": "ZPHC",
    "landerlan": "Landerlan",
    "king": "King",
    "cooper": "Cooper",
}


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = (
        value.replace("á", "a")
        .replace("à", "a")
        .replace("ã", "a")
        .replace("â", "a")
        .replace("é", "e")
        .replace("ê", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ô", "o")
        .replace("õ", "o")
        .replace("ú", "u")
        .replace("ç", "c")
    )
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "item"


def clean_name(name: str) -> str:
    name = re.sub(r"\s*\$[\d.,]+\s*$", "", name).strip()
    name = re.sub(r"\.(jpe?g|png|webp|avif)$", "", name, flags=re.I).strip()
    name = re.sub(r"\s+", " ", name)
    return name


def parse_price(raw: str) -> int:
    # R$ 1.000 -> 1000 ; R$ 200 -> 200  then *1000 = Gs
    parts = raw.split(".")
    if len(parts) == 2 and len(parts[1]) == 3:
        brl = int(raw.replace(".", ""))
    else:
        brl = int(raw.replace(".", ""))
    return brl * 1000


def brand_label(raw: str) -> str:
    key = raw.strip().lower()
    if key in BRAND_ALIASES:
        return BRAND_ALIASES[key]
    if "-" in key:
        return " ".join(p.capitalize() for p in key.split("-"))
    return key.capitalize() if key else "Sem Fronteira"


def infer_unit(dosage: str, name: str) -> str:
    blob = f"{dosage} {name}".lower()
    if any(x in blob for x in ("cp", "cps", "comp", "caps")):
        return "un"
    if "ampol" in blob:
        return "un"
    if "ml" in blob:
        return "ml"
    return "un"


def parse_html() -> list[dict]:
    html = HTML.read_text(encoding="utf-8", errors="ignore")
    cards = re.split(r'<div role="button" tabindex="0"', html)[1:]
    products: list[dict] = []

    for card in cards:
        img_m = re.search(r'src="(/api/media/products/[^"]+)"', card)
        name_m = re.search(r"<h3[^>]*>\s*([^<]+?)\s*</h3>", card, re.S)
        brand_m = re.search(r'text-gold/80"[^>]*>\s*([^<]+?)\s*<', card, re.S)
        dose_m = re.search(r'text-muted-foreground">\s*([^<]+?)\s*<', card)
        price_m = re.search(r'text-gold"[^>]*>\s*R\$\s*([\d.]+)', card)
        cats = re.findall(
            r"uppercase tracking-wider text-white[^>]*>\s*([^<]+?)\s*<", card
        )
        category = None
        for c in cats:
            c = c.strip().lower()
            if c and c != "top":
                category = c
                break
        top = bool(re.search(r">\s*TOP\s*<", card))

        if not (img_m and name_m and price_m and category):
            continue

        name = clean_name(name_m.group(1))
        brand = brand_label(brand_m.group(1) if brand_m else "")
        dosage = (dose_m.group(1).strip() if dose_m else "").strip()
        price = parse_price(price_m.group(1))
        remote = img_m.group(1)

        products.append(
            {
                "name": name,
                "brand": brand,
                "dosage": dosage or "—",
                "price": price,
                "category": category,
                "remote": remote,
                "top": top,
            }
        )

    return products


def download(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        print(f"  skip  {dest.relative_to(ROOT)}")
        return True
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            content = response.read()
            ctype = response.headers.get("Content-Type", "")
    except urllib.error.HTTPError as exc:
        print(f"  fail  {url} ({exc.code})")
        return False
    except Exception as exc:  # noqa: BLE001
        print(f"  fail  {url} ({exc})")
        return False

    # Prefer original suffix; convert avif keep as downloaded
    if dest.suffix == "":
        if "png" in ctype:
            dest = dest.with_suffix(".png")
        elif "webp" in ctype:
            dest = dest.with_suffix(".webp")
        elif "avif" in ctype:
            dest = dest.with_suffix(".avif")
        elif "jpeg" in ctype or "jpg" in ctype:
            dest = dest.with_suffix(".jpg")
        else:
            dest = dest.with_suffix(".bin")

    dest.write_bytes(content)
    print(f"  save  {dest.relative_to(ROOT)} ({len(content)} bytes)")
    return True


def ensure_unique_slugs(products: list[dict]) -> None:
    seen: Counter[str] = Counter()
    for p in products:
        base = slugify(p["name"])
        seen[base] += 1
        if seen[base] == 1:
            p["slug"] = base
        else:
            p["slug"] = f"{base}-{slugify(p['brand'])}"
    # second pass collisions
    used: set[str] = set()
    for i, p in enumerate(products):
        slug = p["slug"]
        if slug in used:
            slug = f"{slug}-{i+1}"
            p["slug"] = slug
        used.add(slug)


def ts_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def write_products_ts(products: list[dict]) -> None:
    lines = [
        'import type { LocalizedString } from "@/data/site";',
        'import type { Locale } from "@/i18n/config";',
        "",
        "export type Product = {",
        "  id: string;",
        "  name: string;",
        "  slug: string;",
        "  brand: string;",
        "  dosage: string;",
        "  unit: string;",
        "  price: number;",
        "  originalPrice?: number;",
        "  categorySlug: string;",
        "  image: string;",
        "  description: LocalizedString;",
        "  stock: number;",
        "  featured: boolean;",
        "  bestSeller: boolean;",
        "  onSale: boolean;",
        "  tags: string[];",
        "};",
        "",
        "export const products: Product[] = [",
    ]

    for i, p in enumerate(products):
        featured = i < 8 or p["top"]
        best = p["top"] or i < 12
        unit = infer_unit(p["dosage"], p["name"])
        desc_es = f'{p["name"]}. {p["dosage"]} · {unit}. Pedi por WhatsApp.'
        desc_pt = f'{p["name"]}. {p["dosage"]} · {unit}. Peca pelo WhatsApp.'
        brand_tag = p["brand"].lower()
        lines.extend(
            [
                "  {",
                f'    id: "p-{i+1}",',
                f'    name: "{ts_escape(p["name"])}",',
                f'    slug: "{p["slug"]}",',
                f'    brand: "{ts_escape(p["brand"])}",',
                f'    dosage: "{ts_escape(p["dosage"])}",',
                f'    unit: "{unit}",',
                f"    price: {p['price']},",
                f'    categorySlug: "{p["category"]}",',
                f'    image: "{p["image"]}",',
                "    description: {",
                f'      es: "{ts_escape(desc_es)}",',
                f'      pt: "{ts_escape(desc_pt)}",',
                "    },",
                "    stock: 100,",
                f"    featured: {'true' if featured else 'false'},",
                f"    bestSeller: {'true' if best else 'false'},",
                "    onSale: false,",
                f'    tags: ["{p["category"]}", "{ts_escape(brand_tag)}"],',
                "  },",
            ]
        )

    lines.extend(
        [
            "];",
            "",
            "export function productDescription(product: Product, locale: Locale): string {",
            "  return product.description[locale] ?? product.description.es;",
            "}",
            "",
        ]
    )
    PRODUCTS_TS.write_text("\n".join(lines))
    print(f"Wrote {PRODUCTS_TS.relative_to(ROOT)} ({len(products)} products)")


def write_categories_ts() -> None:
    lines = [
        'import type { LocalizedString } from "@/data/site";',
        'import type { Locale } from "@/i18n/config";',
        "",
        "export type Category = {",
        "  id: string;",
        "  name: LocalizedString;",
        "  slug: string;",
        "  description: LocalizedString;",
        "  image: string;",
        "  featured: boolean;",
        "  sortOrder: number;",
        "};",
        "",
        "export const categories: Category[] = [",
    ]
    for slug, meta in CATEGORY_META.items():
        lines.extend(
            [
                "  {",
                f'    id: "cat-{slug}",',
                "    name: {",
                f'      es: "{meta["es"][0]}",',
                f'      pt: "{meta["pt"][0]}",',
                "    },",
                f'    slug: "{slug}",',
                "    description: {",
                f'      es: "{meta["es"][1]}",',
                f'      pt: "{meta["pt"][1]}",',
                "    },",
                f'    image: "{meta["image"]}",',
                f"    featured: {'true' if meta['featured'] else 'false'},",
                f"    sortOrder: {meta['sort']},",
                "  },",
            ]
        )
    lines.extend(
        [
            "];",
            "",
            "export function categoryName(category: Category, locale: Locale): string {",
            "  return category.name[locale] ?? category.name.es;",
            "}",
            "",
            "export function categoryDescription(",
            "  category: Category,",
            "  locale: Locale,",
            "): string {",
            "  return category.description[locale] ?? category.description.es;",
            "}",
            "",
        ]
    )
    CATEGORIES_TS.write_text("\n".join(lines))
    print(f"Wrote {CATEGORIES_TS.relative_to(ROOT)}")


def sync_category_svgs() -> None:
    src_map = {
        "anabolizantes.svg": "orales.svg",
        "esteroide.svg": "inyectables.svg",
        "emagrecedores.svg": "combos.svg",
        # hormonios.svg already exists
    }
    cat_dir = ROOT / "public" / "categories"
    for dest_name, src_name in src_map.items():
        dest = cat_dir / dest_name
        src = cat_dir / src_name
        if src.exists() and not dest.exists():
            dest.write_bytes(src.read_bytes())
            print(f"  svg   {dest.relative_to(ROOT)}")


def main() -> int:
    if not HTML.exists():
        print(f"Missing {HTML}")
        return 1

    products = parse_html()
    print(f"Parsed {len(products)} products from HTML")
    print("Categories:", Counter(p["category"] for p in products))

    ensure_unique_slugs(products)
    OUT_IMG.mkdir(parents=True, exist_ok=True)

    manifest_products = []
    for p in products:
        remote_path = p["remote"]
        abs_url = BASE + remote_path
        ext = Path(remote_path).suffix.lower() or ".webp"
        if ext == ".avif":
            # Next Image may not optimize avif from public the same; keep file, prefer webp name if convertible later
            pass
        dest = OUT_IMG / f"{p['slug']}{ext}"
        ok = download(abs_url, dest)
        # If avif failed or we want webp fallback name consistency
        if not ok and ext == ".avif":
            # try same path unlikely; skip
            dest = OUT_IMG / f"{p['slug']}.webp"
        p["image"] = f"/products/remote/{dest.name}"
        if ok or dest.exists():
            manifest_products.append(
                {
                    "name": p["name"],
                    "slug": p["slug"],
                    "src": p["image"],
                    "remote": abs_url,
                    "category": p["category"],
                    "price": p["price"],
                    "brand": p["brand"],
                }
            )

    sync_category_svgs()
    write_categories_ts()
    write_products_ts(products)

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    existing = {}
    if MANIFEST.exists():
        try:
            existing = json.loads(MANIFEST.read_text())
        except json.JSONDecodeError:
            existing = {}
    existing["source"] = BASE
    existing["products"] = manifest_products
    existing["categories"] = [
        {"slug": slug, "src": meta["image"]} for slug, meta in CATEGORY_META.items()
    ]
    MANIFEST.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + "\n")
    print(f"Manifest products: {len(manifest_products)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
