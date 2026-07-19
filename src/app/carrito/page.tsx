"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
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
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const coupon = useCartStore((s) => s.coupon);
  const couponError = useCartStore((s) => s.couponError);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const clearCart = useCartStore((s) => s.clearCart);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [couponInput, setCouponInput] = useState("");
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const subtotal = getCartSubtotal(lines);
  const discount = getCartDiscount(lines, coupon);
  const shipping = getCartShipping(lines, coupon);
  const total = getCartTotal(lines, coupon);
  const freeShipping = getFreeShippingProgress(lines, coupon);

  function handleApplyCoupon(e: FormEvent) {
    e.preventDefault();
    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponInput("");
    } else {
      setCouponSuccess(null);
    }
  }

  if (hasHydrated && lines.length === 0) {
    return (
      <div className="py-8 sm:py-12">
        <Container>
          <EmptyState
            icon={ShoppingBag}
            title="Tu carrito está vacío"
            description="Todavía no agregaste productos. Explorá la tienda y encontrá algo que te guste."
            actionLabel="Ir a la tienda"
            actionHref="/tienda"
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mb-8 flex items-center justify-between border-b border-brand-border pb-6">
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">Tu carrito</h1>
          {lines.length > 0 &&
            (showClearConfirm ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand-muted">¿Vaciar el carrito?</span>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                  className="font-medium text-brand-red hover:underline"
                >
                  Sí, vaciar
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="text-brand-muted hover:underline"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="text-sm font-medium text-brand-muted hover:text-brand-red"
              >
                Vaciar carrito
              </button>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="flex flex-col divide-y divide-brand-border">
            {lines.map((line) => {
              const product = getProductBySlug(line.slug);
              const maxStock = product?.availableStock[line.size] ?? line.quantity;
              const isLowStock = maxStock > 0 && maxStock <= 2;
              return (
                <li key={line.lineId} className="flex gap-4 py-6 first:pt-0">
                  <Link href={`/producto/${line.slug}`} className="relative h-32 w-24 shrink-0 overflow-hidden bg-brand-gray sm:h-40 sm:w-32">
                    <Image src={line.image} alt={line.name} fill sizes="128px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/producto/${line.slug}`} className="text-sm font-medium text-brand-black hover:underline sm:text-base">
                          {line.name}
                        </Link>
                        <p className="mt-1 text-xs text-brand-muted sm:text-sm">
                          Color: {line.color} · Talle: {line.size}
                        </p>
                        {maxStock === 0 && <p className="mt-1 text-xs font-medium text-brand-red">Sin stock disponible</p>}
                        {isLowStock && maxStock > 0 && (
                          <p className="mt-1 text-xs font-medium text-brand-red">Últimas unidades</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.lineId)}
                        aria-label={`Eliminar ${line.name} del carrito`}
                        className="shrink-0 text-brand-muted hover:text-brand-red focus-ring"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-brand-border">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(line.lineId)}
                          aria-label="Disminuir cantidad"
                          className="flex h-9 w-9 items-center justify-center text-brand-black hover:bg-brand-gray focus-ring"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(line.lineId, maxStock)}
                          disabled={line.quantity >= maxStock}
                          aria-label="Aumentar cantidad"
                          className="flex h-9 w-9 items-center justify-center text-brand-black hover:bg-brand-gray focus-ring disabled:opacity-30"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-brand-black sm:text-base">
                        {formatPrice(line.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit border border-brand-border p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-black">Resumen</h2>

            <div className="mb-4">
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
                <div className="h-1.5 bg-brand-red transition-all duration-500" style={{ width: `${freeShipping.progress}%` }} />
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="mb-5">
              {coupon ? (
                <div className="flex items-center justify-between border border-brand-black bg-brand-gray px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 font-medium text-brand-black">
                    <Tag className="h-4 w-4" /> {coupon.code} aplicado
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      removeCoupon();
                      setCouponSuccess(null);
                    }}
                    className="text-xs text-brand-muted hover:text-brand-red"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <div>
                  <label htmlFor="coupon" className="mb-1.5 block text-xs font-medium text-brand-black">
                    Cupón de descuento
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="coupon"
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Ingresá tu código"
                      className="h-10 flex-1 border border-brand-border px-3 text-sm focus:border-brand-black focus:outline-none"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      Aplicar
                    </Button>
                  </div>
                  {couponError && <p className="mt-1.5 text-xs text-brand-red">{couponError}</p>}
                  {couponSuccess && <p className="mt-1.5 text-xs text-brand-black">{couponSuccess}</p>}
                </div>
              )}
            </form>

            <div className="space-y-2 border-t border-brand-border pt-4">
              <div className="flex justify-between text-sm text-brand-muted">
                <span>Subtotal</span>
                <span className="text-brand-black">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-brand-red">
                  <span>Descuento</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-brand-muted">
                <span>Envío</span>
                <span className="text-brand-black">{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-brand-border pt-3 text-base font-semibold text-brand-black">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button href="/checkout" variant="accent" size="lg" fullWidth className="mt-5">
              Finalizar compra
            </Button>
            <Button href="/tienda" variant="ghost" size="md" fullWidth className="mt-2">
              Continuar comprando
            </Button>
          </aside>
        </div>
      </Container>
    </div>
  );
}
