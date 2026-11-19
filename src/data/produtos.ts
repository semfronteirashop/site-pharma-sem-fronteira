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

function linkWhatsAppPreco(nome: string) {
  return buildWhatsAppUrl(
    `Olá! Gostaria de saber o preço do ${nome} da Medicube.`,
  );
}

export const PRODUTOS_NOVIDADES: ProdutoNovidade[] = [
  {
    id: "serum-pdrn",
    nome: "Sérum PDRN Pink Peptide",
    categoria: "Cosméticos",
    imagem: "/produtos/serum-pdrn.webp",
    corDestaque: "#F2668B",
    link: linkWhatsAppPreco("Sérum PDRN Pink Peptide"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "mascara-argila",
    nome: "Máscara Zero Pore Blackhead",
    categoria: "Cosméticos",
    imagem: "/produtos/mascara-argila.webp",
    corDestaque: "#1F4FD1",
    link: linkWhatsAppPreco("Máscara Zero Pore Blackhead"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "jelly-cream",
    nome: "Creme Collagen Jelly",
    categoria: "Cosméticos",
    imagem: "/produtos/jelly-cream.webp",
    corDestaque: "#F59AB5",
    link: linkWhatsAppPreco("Creme Collagen Jelly"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "protetor-solar",
    nome: "Protetor Solar Zero Pore FPS 50+",
    categoria: "Cosméticos",
    imagem: "/produtos/protetor-solar.webp",
    corDestaque: "#5AAFE6",
    link: linkWhatsAppPreco("Protetor Solar Zero Pore FPS 50+"),
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    id: "serum-zero-pore",
    nome: "Sérum Zero Pore 2.0",
    categoria: "Cosméticos",
    imagem: "/produtos/serum-zero-pore.webp",
    corDestaque: "#2D6FD8",
    link: linkWhatsAppPreco("Sérum Zero Pore 2.0"),
    imageWidth: 800,
    imageHeight: 1000,
  },
];

export function produtoNovidadeLinkEhExterno(link: string): boolean {
  return link.startsWith("http://") || link.startsWith("https://");
}