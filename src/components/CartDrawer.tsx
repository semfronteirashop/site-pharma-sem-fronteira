"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/components/LocaleProvider";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();
  const { dictionary, href, locale } = useLocale();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label={dictionary.cartDrawer.close}
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
      />

      <aside className="absolute inset-x-0 bottom-0 flex max-h-[92vh] w-full flex-col rounded-t-3xl bg-surface shadow-2xl animate-sheet-in sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:max-w-md sm:rounded-none sm:animate-drawer-in">
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-border sm:hidden" />

        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:py-4">
          <div>
            <h2 className="text-lg font-extrabold">{dictionary.cartDrawer.title}</h2>
            <p className="text-sm text-muted">
              {dictionary.cartDrawer.items(itemCount)}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-background"
          >
            {dictionary.cartDrawer.close}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-4 py-12 text-center">
              <p className="text-sm text-muted">{dictionary.cartDrawer.empty}</p>
              <Link
                href={href("/produtos")}
                onClick={closeCart}
                className="mt-4 inline-flex rounded-full bg-teal px-4 py-2 text-sm font-bold text-foreground"
              >
                {dictionary.cartDrawer.seeProducts}
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-3 rounded-2xl border border-border p-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-background sm:h-20 sm:w-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={href(`/produto/${item.slug}`)}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-semibold hover:text-blue"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted">{item.brand}</p>
                    <p className="mt-1 text-sm font-bold">
                      {formatPrice(item.price, locale)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-9 w-9 rounded-full border border-border"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="h-9 w-9 rounded-full border border-border"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-xs text-sale hover:underline"
                        onClick={() => removeItem(item.productId)}
                      >
                        {dictionary.cartDrawer.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="border-t border-border px-4 py-4"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted">
              {dictionary.cartDrawer.subtotal}
            </span>
            <span className="text-lg font-extrabold">
              {formatPrice(subtotal, locale)}
            </span>
          </div>
          <Link
            href={href("/checkout")}
            onClick={closeCart}
            className={`flex h-12 items-center justify-center rounded-full text-sm font-bold ${
              items.length === 0
                ? "pointer-events-none bg-border text-muted"
                : "bg-teal text-foreground hover:bg-teal-hover"
            }`}
          >
            {dictionary.cartDrawer.goCheckout}
          </Link>
        </div>
      </aside>
    </div>
  );
}
