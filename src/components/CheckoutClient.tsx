"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart";
import { buildCartQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";

export function CheckoutClient() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { dictionary, href, locale } = useLocale();

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center">
        <p className="font-semibold">{dictionary.checkout.emptyTitle}</p>
        <p className="mt-1 text-sm text-muted">{dictionary.checkout.emptyLead}</p>
        <AppLink
          href={href("/produtos")}
          className="mt-5 inline-flex h-11 items-center rounded-full bg-brand-purple px-5 text-sm font-bold text-white hover:bg-brand-purple-hover"
        >
          {dictionary.checkout.seeProducts}
        </AppLink>
      </div>
    );
  }

  const message = buildCartQuoteMessage(
    items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
    })),
    locale,
  );
  const whatsappUrl = buildWhatsAppUrl(message);

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex gap-3 rounded-xl border border-border bg-surface p-3"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-background">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="mt-1 text-sm text-muted">{item.brand}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  className="h-8 w-8 rounded-md border border-border"
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  className="h-8 w-8 rounded-md border border-border"
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

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-sm text-muted">{dictionary.checkout.shippingNote}</p>
        <div className="mt-4 space-y-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white hover:bg-brand-green-dark"
          >
            {dictionary.checkout.requestQuoteWhatsapp}
          </a>
          <div className="flex gap-2">
            <AppLink
              href={href("/produtos")}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border text-sm font-semibold"
            >
              {dictionary.checkout.keepShopping}
            </AppLink>
            <button
              type="button"
              onClick={() => clearCart()}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-4 text-sm font-semibold text-muted"
            >
              {dictionary.checkout.clear}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}