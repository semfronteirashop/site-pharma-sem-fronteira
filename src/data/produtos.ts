import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Produtos exibidos no carrossel 3D "Novidades" da Home. */
export type ProdutoNovidade = {
  id: string;
  nome: string;
  categoria: string;
  imagem: string;
  corDestaque: string;
  /** URL absoluta (ex.: WhatsApp) ou rota interna futura. */
  link: string;
  imageWidth: number;
  imageHeight: number;
};

export const MARCA_EXIBICAO = "Medicube";

function linkWhatsAppInteresse(nome: string) {
  return buildWhatsAppUrl(`Olá! Tenho interesse no ${nome} da Medicube.`);
}

export const PRODUTOS_NOVIDADES: ProdutoNovidade[] = [
  {
    id: "serum-pdrn",
    nome: "Sérum PDRN Pink Peptide",
    categoria: "Dermocosméticos",
    imagem: "/produtos/serum-pdrn.webp",
    corDestaque: "#F2668B",
    link: linkWhatsAppInteresse("Sérum PDRN Pink Peptide"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "mascara-argila",
    nome: "Máscara Zero Pore Blackhead",
    categoria: "Dermocosméticos",
    imagem: "/produtos/mascara-argila.webp",
    corDestaque: "#1F4FD1",
    link: linkWhatsAppInteresse("Máscara Zero Pore Blackhead"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "jelly-cream",
    nome: "Creme Collagen Jelly",
    categoria: "Dermocosméticos",
    imagem: "/produtos/jelly-cream.webp",
    corDestaque: "#F59AB5",
    link: linkWhatsAppInteresse("Creme Collagen Jelly"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "protetor-solar",
    nome: "Protetor Solar Zero Pore FPS 50+",
    categoria: "Dermocosméticos",
    imagem: "/produtos/protetor-solar.webp",
    corDestaque: "#5AAFE6",
    link: linkWhatsAppInteresse("Protetor Solar Zero Pore FPS 50+"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "serum-zero-pore",
    nome: "Sérum Zero Pore 2.0",
    categoria: "Dermocosméticos",
    imagem: "/produtos/serum-zero-pore.webp",
    corDestaque: "#2D6FD8",
    link: linkWhatsAppInteresse("Sérum Zero Pore 2.0"),
    imageWidth: 800,
    imageHeight: 1000,
  },
];

export function produtoNovidadeLinkEhExterno(link: string): boolean {
  return link.startsWith("http://") || link.startsWith("https://");
}