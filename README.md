# Sem Fronteira Suplementos

Loja pública em Next.js (App Router) com SEO, catálogo local e checkout por WhatsApp.

Visual de farmácia digital (azul + teal). Design system em [docs/design-system.md](docs/design-system.md).

## Idiomas

- Espanhol (`/es`) — padrão
- Português (`/pt`)

O middleware detecta o idioma pelo cookie ou pelo `Accept-Language` do navegador. Dá para trocar manualmente no header (ES/PT).

## Começar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build
- `npm run start` — produção
- `npm run lint` — ESLint

## Onde editar

- `src/data/site.ts` — nome, WhatsApp, textos
- `src/data/products.ts` / `categories.ts` — catálogo
- `public/` — imagens

## Baixar imagens do site ao vivo

```bash
python3 scripts/download_site_images.py
```

Salva em:

- `public/brand/` — logo
- `public/banners/remote/` — banners
- `public/products/remote/` — fotos de produtos
- `public/media/manifest.json` — mapa id → arquivo local

## SEO

Metadata por página, `sitemap.xml`, `robots.txt` e JSON-LD (Organization + Product).
