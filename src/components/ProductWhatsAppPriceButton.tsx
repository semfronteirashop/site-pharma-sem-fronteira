"use client";

import type { Product } from "@/data/products";
import { productName } from "@/data/products";
import { buildSupportMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { useLocale } from "@/components/LocaleProvider";

type ProductWhatsAppPriceButtonProps = {
  product: Product;
  className?: string;
  variant?: "card" | "detail" | "compact";
};

export function ProductWhatsAppPriceButton({
  product,
  className = "",
  variant = "detail",
}: ProductWhatsAppPriceButtonProps) {
  const { locale, dictionary } = useLocale();
  const whatsappUrl = buildWhatsAppUrl(
    buildSupportMessage(locale, productName(product, locale)),
  );

  const variantClasses =
    variant === "card"
      ? "flex w-full min-h-[2.75rem] items-center justify-center px-3 py-2.5 text-center text-[11px] leading-snug sm:min-h-[3rem] sm:px-4 sm:text-xs"
      : variant === "compact"
        ? "inline-flex h-10 w-full items-center justify-center px-3 text-xs leading-snug"
        : "flex w-full min-h-[3rem] items-center justify-center px-4 py-3 text-center text-sm leading-snug sm:min-h-[3.25rem] sm:text-base";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-full bg-brand-green font-bold text-white shadow-[0_4px_12px_rgba(18,168,58,0.28)] transition hover:bg-brand-green-dark active:scale-[0.98] ${variantClasses} ${className}`}
    >
      {dictionary.productCard.consultPriceWhatsapp}
    </a>
  );
}
