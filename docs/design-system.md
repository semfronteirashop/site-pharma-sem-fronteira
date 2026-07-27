# Sem Fronteira — Design System

Referência visual: HealKart (farmácia digital clara).  
Arquivos: [healKart-hero.png](references/healKart-hero.png), [healKart-sections.png](references/healKart-sections.png).

## Princípio

Farmácia online: limpa, confiável, fácil de comprar. Fundo claro, azul de confiança, teal de saúde. Sem tema escuro, sem neon, sem tipografia “landing IA”.

## Cores

| Token | Hex | Uso |
| --- | --- | --- |
| `--blue` | `#1B57C4` | Hero, CTA secundário, destaque de confiança |
| `--blue-hover` | `#1547A0` | Hover do azul |
| `--teal` | `#2DD4A8` | CTA principal, logo accent, links ativos |
| `--teal-hover` | `#22C19A` | Hover do teal |
| `--teal-deep` | `#0F9F7F` | Texto/link teal mais legível |
| `--background` | `#F7F9FC` | Fundo da página |
| `--surface` | `#FFFFFF` | Header, cards, drawers |
| `--foreground` | `#111827` | Títulos e texto principal |
| `--muted` | `#6B7280` | Texto secundário |
| `--border` | `#E6EAF0` | Bordas leves |
| `--sale` | `#EF4444` | Badge de desconto |
| `--whatsapp` | `#25D366` | Só botão WhatsApp |
| `--topbar` | `#123B7A` | Faixa de envio (azul escuro) |

### Pastéis de categoria

| Token | Hex | Categoria |
| --- | --- | --- |
| `--pastel-1` | `#FFE8D6` | Orales |
| `--pastel-2` | `#D9F3F0` | Inyectables |
| `--pastel-3` | `#F8E0EC` | Hormonios |
| `--pastel-4` | `#E8E4F8` | Combos |

## Tipografia

- Fonte: Figtree (já no projeto)
- Título hero: 40–56px / extrabold
- Título de seção: 22–28px / bold
- Corpo: 14–16px / regular
- Labels: 12–13px / medium, cinza

## Forma e espaçamento

- Raio padrão: `16px` (cards), `999px` (pills/botões principais)
- Container: `max-w-7xl`, padding lateral `16–24px`
- Gap de grid produtos: `12–16px`
- Sombra: quase nenhuma; no máximo `0 8px 24px rgba(17,24,39,0.06)` em card hover

## Componentes

### Topbar
- Faixa azul escura
- Texto: envio Brasil / Paraguai + horário
- WhatsApp à direita

### Header
- Fundo branco
- Logo à esquerda (nome + “Suplementos”)
- Busca pill cinza clara no centro
- Ações: idioma ES/PT, WhatsApp (verde), Carrinho
- Nav horizontal abaixo com links em cinza escuro; ativo/hover em teal

### Hero
- Bloco azul royal com cantos bem arredondados (`24–32px`)
- Headline branca com marca em evidência
- CTA principal teal pill (“Ver productos”)
- CTA secundário outline branco
- Sem overlays/stickers flutuantes no hero

### Cards de categoria
- Fundo pastel
- Título curto + descrição mínima
- Raio 16px, sem borda pesada

### Cards de produto
- Fundo branco, borda `#E6EAF0`
- Imagem em área clara arredondada
- Marca cinza, nome bold, preço forte
- Badge vermelho para desconto
- Botão “Agregar” teal pill

### Botões

| Tipo | Estilo |
| --- | --- |
| Primário | Teal sólido, texto escuro/branco, pill |
| Secundário | Azul sólido, texto branco, pill |
| Ghost | Borda cinza ou branca, fundo transparente |
| WhatsApp | Verde WhatsApp, só conversão de chat |

## Layout da home

1. Topbar + Header + Nav  
2. Hero azul  
3. Categorias em pastéis  
4. Prateleiras: Destacados / Mais vendidos / Ofertas  
5. Bloco curto de autenticação  
6. Footer branco com links

## i18n

- Padrão: `es`
- Alternativo: `pt`
- Seletor no header
- Copy direta (anti-slop): frases curtas, sem jargão

## O que não fazer

- Fundo preto / neon verde
- Gradiente roxo
- Cards com sombra tripla
- Eyebrows com letter-spacing exagerado
- Stickers flutuantes no hero
- Usar WhatsApp green como cor de marca
