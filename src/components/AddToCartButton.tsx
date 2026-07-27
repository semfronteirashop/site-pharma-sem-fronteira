"use client";

import type { Product } from "@/data/products";
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
  const disabled = product.stock <= 0;

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
        aria-label={
          disabled ? dictionary.productCard.out : dictionary.productCard.add
        }
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal text-lg font-bold text-foreground shadow-[0_4px_12px_rgba(15,159,127,0.35)] transition active:scale-95 disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:shadow-none ${className}`}
      >
        {disabled ? "—" : "+"}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => addItem(product, quantity)}
      className={`inline-flex items-center justify-center rounded-full font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-border disabled:text-muted ${
        compact
          ? "h-10 bg-teal px-3 text-sm text-foreground hover:bg-teal-hover"
          : "h-12 bg-teal px-6 text-base text-foreground hover:bg-teal-hover"
      } ${className}`}
    >
      {disabled
        ? dictionary.productCard.out
        : compact
          ? dictionary.productCard.add
          : dictionary.productPage.addToCart}
    </button>
  );
}
