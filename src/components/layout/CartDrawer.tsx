"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartShipping,
  getCartTotal,
  getFreeShippingProgress,
} from "@/lib/store/cart";
import { getProductBySlug } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export function CartDrawer() {
  const isOpen = useUIStore((s) => s.isCartOpen);
  const close = useUIStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const coupon = useCartStore((s) => s.coupon);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeLine = useCartStore((s) => s.removeLine);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const subtotal = getCartSubtotal(lines);
  const discount = getCartDiscount(lines, coupon);
  const shipping = getCartShipping(lines, coupon);
  const total = getCartTotal(lines, coupon);
  const freeShipping = getFreeShippingProgress(lines, coupon);

  return (
    <div
      className={cn("fixed inset-0 z-[75]", isOpen ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-brand-black/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-brand-white transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-brand-border px-4 py-4 sm:px-6">
          <h2 className="text-base font-semibold uppercase tracking-wide">Tu carrito ({lines.length})</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center focus-ring"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-brand-muted" aria-hidden="true" />
            <p className="text-sm text-brand-muted">Tu carrito está vacío por ahora.</p>
            <Button href="/tienda" variant="primary" size="md" onClick={close}>
              Ir a la tienda
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-brand-border px-4 py-3 sm:px-6">
              <div className="mb-1.5 flex justify-between text-xs text-brand-muted">
                {freeShipping.reached ? (
                  <span className="font-medium text-brand-black">¡Tenés envío gratis!</span>
                ) : (
                  <span>
                    Te faltan <span className="font-medium text-brand-black">{formatPrice(freeShipping.remaining)}</span> para
                    envío gratis
                  </span>
                )}
              </div>
              <div className="h-1.5 w-full bg-brand-gray">
                <div
                  className="h-1.5 bg-brand-red transition-all duration-500"
                  style={{ width: `${freeShipping.progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              {lines.map((line) => {
                const product = getProductBySlug(line.slug);
                const maxStock = product?.availableStock[line.size] ?? line.quantity;
                return (
                  <li key={line.lineId} className="flex gap-3 border-b border-brand-border py-4 first:pt-0 last:border-0">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-brand-gray">
                      <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/producto/${line.slug}`}
                          onClick={close}
                          className="text-sm font-medium text-brand-black hover:underline"
                        >
                          {line.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeLine(line.lineId)}
                          aria-label={`Eliminar ${line.name} del carrito`}
                          className="shrink-0 text-brand-muted hover:text-brand-red focus-ring"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-brand-muted">
                        Color: {line.color} · Talle: {line.size}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center border border-brand-border">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(line.lineId)}
                            aria-label="Disminuir cantidad"
                            className="flex h-7 w-7 items-center justify-center text-brand-black hover:bg-brand-gray focus-ring"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm">{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(line.lineId, maxStock)}
                            disabled={line.quantity >= maxStock}
                            aria-label="Aumentar cantidad"
                            className="flex h-7 w-7 items-center justify-center text-brand-black hover:bg-brand-gray focus-ring disabled:opacity-30"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-brand-black">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </div>
                      {line.quantity >= maxStock && (
                        <p className="text-[11px] text-brand-muted">Cantidad máxima disponible</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-2 border-t border-brand-border px-4 py-4 sm:px-6">
              <div className="flex justify-between text-sm text-brand-muted">
                <span>Subtotal</span>
                <span className="text-brand-black">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-brand-red">
                  <span>Descuento ({coupon?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-brand-muted">
                <span>Envío</span>
                <span className="text-brand-black">{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-brand-border pt-2 text-base font-semibold text-brand-black">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button href="/checkout" variant="accent" size="lg" fullWidth onClick={close} className="mt-2">
                Finalizar compra
              </Button>
              <Button href="/carrito" variant="secondary" size="md" fullWidth onClick={close}>
                Ver carrito completo
              </Button>
              <p className="pt-1 text-center text-[11px] text-brand-muted">{siteConfig.shipping.pickupMessage}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
