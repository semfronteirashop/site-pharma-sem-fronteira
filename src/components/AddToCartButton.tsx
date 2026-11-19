"use client";

import type { Product } from "@/data/products";
import { productIsInStock } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/components/LocaleProvider";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  compact?: boolean;
  iconOnly?: boolean;
  className?: string;
};

export function AddToCartButton({
  product,
  quantity = 1,
  compact = false,
  iconOnly = false,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { dictionary } = useLocale();

  const disabled = !productIsInStock(product);

  if (iconOnly) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          addItem(product, quantity);
        }}
        aria-label={dictionary.productCard.add}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white shadow-[0_4px_12px_rgba(18,168,58,0.35)] transition active:scale-95 disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:shadow-none ${className}`}
      >
        +
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => addItem(product, quantity)}
      className={`inline-flex items-center justify-center rounded-full font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-border disabled:text-muted ${compact
          ? "h-10 bg-brand-green px-3 text-sm text-white hover:bg-brand-green-dark"
          : "h-12 bg-brand-green px-6 text-base text-white hover:bg-brand-green-dark"
        } ${className}`}
    >
      {compact ? dictionary.productCard.add : dictionary.productPage.addToCart}
    </button>
  );
}
