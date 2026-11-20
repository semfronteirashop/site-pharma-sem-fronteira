import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatPrice } from "@/lib/format";

export type WhatsAppLineItem = {
  name: string;
  quantity: number;
  price: number;
};

export function buildWhatsAppUrl(message: string): string {
  const phone = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildCheckoutMessage(
  items: WhatsAppLineItem[],
  total: number,
  locale: Locale,
): string {
  const t = getDictionary(locale).whatsappMsg;
  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity, locale)}`,
  );

  return [
    t.orderIntro(site.name),
    "",
    ...lines,
    "",
    t.total(formatPrice(total, locale)),
    "",
    t.confirm,
  ].join("\n");
}

export function buildSupportMessage(locale: Locale, topic?: string): string {
  const t = getDictionary(locale).whatsappMsg;
  return t.support(topic ?? t.defaultTopic, site.name);
}

/** Consulta de preco de um produto (PT/ES). */
export function buildProductPriceInquiryMessage(
  productName: string,
  locale: Locale,
): string {
  return getDictionary(locale).whatsappMsg.productPriceInquiry(productName);
}

export type WhatsAppQuoteLineItem = {
  name: string;
  quantity: number;
};

/** Pedido de orcamento do carrinho — sem valores (opcao B). */
export function buildCartQuoteMessage(
  items: WhatsAppQuoteLineItem[],
  locale: Locale,
): string {
  const t = getDictionary(locale).whatsappMsg;
  const lines = items.map((item) => `• ${item.quantity}x ${item.name}`);
  return [t.cartQuoteIntro(site.name), "", ...lines, "", t.cartQuoteClosing].join(
    "\n",
  );
}

export function buildProductOrderMessage(
  product: {
    name: string;
    brand: string;
    price: number;
  },
  locale: Locale,
  quantity = 1,
): string {
  const t = getDictionary(locale).whatsappMsg;
  const lineTotal = formatPrice(product.price * quantity, locale);

  return [
    t.orderIntro(site.name),
    "",
    `• ${quantity}x ${product.name} (${product.brand}) — ${lineTotal}`,
    "",
    t.confirm,
  ].join("\n");
}
