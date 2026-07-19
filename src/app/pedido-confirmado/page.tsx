"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Truck, Store } from "lucide-react";
import { ORDER_STORAGE_KEY } from "@/lib/checkout";
import type { OrderSummary } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState<OrderSummary | null | undefined>(undefined);

  useEffect(() => {
    const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (raw) {
      try {
        setOrder(JSON.parse(raw) as OrderSummary);
      } catch {
        setOrder(null);
      }
    } else {
      setOrder(null);
    }
  }, []);

  if (order === undefined) {
    return <div className="py-24" />;
  }

  if (order === null) {
    return (
      <div className="py-16 sm:py-24">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-display text-2xl font-bold text-brand-black">No encontramos tu pedido</h1>
          <p className="max-w-sm text-sm text-brand-muted">
            No tenemos información de una compra reciente en esta sesión.
          </p>
          <Button href="/tienda" variant="primary" size="lg">
            Ir a la tienda
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24">
      <Container className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-soft">
            <CheckCircle2 className="h-8 w-8 text-brand-red" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">¡Compra confirmada!</h1>
          <p className="max-w-md text-sm text-brand-muted">
            Gracias {order.customerName}, tu pedido <span className="font-semibold text-brand-black">#{order.orderNumber}</span>{" "}
            fue registrado correctamente.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 border border-brand-black bg-brand-gray p-3 text-center text-xs text-brand-black">
          Esta es una demostración. No se procesó ningún pago real.
        </div>

        <div className="mt-10 border border-brand-border p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-brand-border pb-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-brand-muted">Número de pedido</p>
              <p className="text-lg font-semibold text-brand-black">#{order.orderNumber}</p>
            </div>
            <p className="text-sm text-brand-muted">{formatDate(order.createdAt)}</p>
          </div>

          <ul className="mb-4 flex flex-col gap-3 border-b border-brand-border pb-4">
            {order.lines.map((line) => (
              <li key={line.lineId} className="flex justify-between gap-3 text-sm">
                <span className="text-brand-muted">
                  {line.name}
                  <span className="block text-xs">
                    {line.color} · {line.size} · x{line.quantity}
                  </span>
                </span>
                <span className="shrink-0 font-medium text-brand-black">{formatPrice(line.price * line.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-brand-muted">
              <span>Subtotal</span>
              <span className="text-brand-black">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-brand-red">
                <span>Descuento</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-brand-muted">
              <span>Envío</span>
              <span className="text-brand-black">{order.shipping === 0 ? "Gratis" : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-border pt-3 text-base font-semibold text-brand-black">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-brand-border pt-4 text-sm text-brand-muted">
            <p className="flex items-center gap-2">
              {order.deliveryMethod === "domicilio" ? (
                <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Store className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {order.deliveryMethod === "domicilio" ? "Envío a domicilio" : "Retiro en tienda"}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              Te enviamos la confirmación a {order.customerEmail} (correo ficticio de demostración).
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/tienda" variant="primary" size="lg">
            Volver a la tienda
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-brand-muted">{siteConfig.footer.aboutText}</p>
      </Container>
    </div>
  );
}
