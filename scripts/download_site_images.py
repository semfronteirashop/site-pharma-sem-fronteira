#!/usr/bin/env python3
"""Baixa imagens públicas do site pharmasemfronteira.com para /public."""

from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://pharmasemfronteira.com"
UA = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
}

ROOT = Path(__file__).resolve().parents[1]
OUT = {
    "logo": ROOT / "public" / "brand",
    "products": ROOT / "public" / "products" / "remote",
    "banners": ROOT / "public" / "banners" / "remote",
    "categories": ROOT / "public" / "categories" / "remote",
    "misc": ROOT / "public" / "media",
}
MANIFEST = ROOT / "public" / "media" / "manifest.json"


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "file"


def absolute_url(path: str) -> str:
    if path.startswith("http://") or path.startswith("https://"):
        return path
    if not path.startswith("/"):
        path = "/" + path
    return BASE + path


def trpc(proc: str, payload: dict | None = None):
    if payload is None:
        payload = {"0": {"json": None}}
    encoded = urllib.parse.quote(json.dumps(payload, separators=(",", ":")))
    url = f"{BASE}/api/trpc/{proc}?batch=1&input={encoded}"
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45) as response:
        data = json.load(response)
    return data[0]["result"]["data"]["json"]


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

    # Infer extension if missing.
    if dest.suffix == "":
        if "png" in ctype:
            dest = dest.with_suffix(".png")
        elif "webp" in ctype:
            dest = dest.with_suffix(".webp")
        elif "jpeg" in ctype or "jpg" in ctype:
            dest = dest.with_suffix(".jpg")
        else:
            dest = dest.with_suffix(".bin")

    dest.write_bytes(content)
    print(f"  save  {dest.relative_to(ROOT)} ({len(content)} bytes)")
    return True


def ext_from_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path
    suffix = Path(path).suffix.lower()
    if suffix in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}:
        return suffix
    return ""


def main() -> int:
    for folder in OUT.values():
        folder.mkdir(parents=True, exist_ok=True)

    manifest: dict = {
        "source": BASE,
        "logo": None,
        "banners": [],
        "products": [],
        "categories": [],
    }

    print("→ settings / logo")
    try:
        logo = trpc("settings.get", {"0": {"json": {"key": "site_logo"}}})
        logo_url = logo.get("value") if isinstance(logo, dict) else None
        if logo_url:
            abs_logo = absolute_url(logo_url)
            ext = ext_from_url(abs_logo) or ".png"
            dest = OUT["logo"] / f"logo{ext}"
            if download(abs_logo, dest):
                manifest["logo"] = f"/brand/{dest.name}"
    except Exception as exc:  # noqa: BLE001
        print(f"  logo error: {exc}")

    print("→ banners")
    try:
        banners = trpc("banner.list") or []
        for i, banner in enumerate(banners, start=1):
            image = banner.get("image") or banner.get("mediaUrl")
            if not image:
                continue
            abs_url = absolute_url(image)
            ext = ext_from_url(abs_url) or ".webp"
            name = slugify(banner.get("title") or f"banner-{i}")
            dest = OUT["banners"] / f"{name}{ext}"
            if download(abs_url, dest):
                manifest["banners"].append(
                    {
                        "id": banner.get("id"),
                        "src": f"/banners/remote/{dest.name}",
                        "remote": abs_url,
                    }
                )
    except Exception as exc:  # noqa: BLE001
        print(f"  banners error: {exc}")

    print("→ products")
    try:
        products = trpc("product.list") or []
        for product in products:
            image = product.get("image")
            if not image:
                continue
            abs_url = absolute_url(image)
            ext = ext_from_url(abs_url) or ".webp"
            name = slugify(product.get("slug") or product.get("name") or str(product.get("id")))
            dest = OUT["products"] / f"{name}{ext}"
            if download(abs_url, dest):
                manifest["products"].append(
                    {
                        "id": product.get("id"),
                        "name": product.get("name"),
                        "slug": product.get("slug"),
                        "src": f"/products/remote/{dest.name}",
                        "remote": abs_url,
                    }
                )
    except Exception as exc:  # noqa: BLE001
        print(f"  products error: {exc}")

    print("→ categories")
    try:
        categories = trpc("category.list") or []
        for category in categories:
            image = category.get("image") or category.get("icon")
            # icon may be a string key, not a URL
            if not image or not str(image).startswith(("/", "http")):
                continue
            abs_url = absolute_url(image)
            ext = ext_from_url(abs_url) or ".webp"
            name = slugify(category.get("slug") or category.get("name") or str(category.get("id")))
            dest = OUT["categories"] / f"{name}{ext}"
            if download(abs_url, dest):
                manifest["categories"].append(
                    {
                        "id": category.get("id"),
                        "name": category.get("name"),
                        "slug": category.get("slug"),
                        "src": f"/categories/remote/{dest.name}",
                        "remote": abs_url,
                    }
                )
    except Exception as exc:  # noqa: BLE001
        print(f"  categories error: {exc}")

    # Also try favicon
    print("→ favicon")
    fav = absolute_url("/favicon.png")
    download(fav, OUT["misc"] / "favicon-remote.png")

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(f"\nManifesto: {MANIFEST.relative_to(ROOT)}")
    print(
        f"Totais → logo:{1 if manifest['logo'] else 0} "
        f"banners:{len(manifest['banners'])} "
        f"products:{len(manifest['products'])} "
        f"categories:{len(manifest['categories'])}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
