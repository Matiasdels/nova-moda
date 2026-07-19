"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CreditCard, Landmark, Store, Truck } from "lucide-react";
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartShipping,
  getCartTotal,
} from "@/lib/store/cart";
import {
  INITIAL_CHECKOUT_DATA,
  INSTALLMENT_OPTIONS,
  ORDER_STORAGE_KEY,
  URUGUAY_DEPARTMENTS,
  validateCheckout,
  type CheckoutFormData,
} from "@/lib/checkout";
import type { OrderSummary } from "@/lib/types";
import { formatPrice, generateOrderNumber, cn } from "@/lib/utils";
import { FormField, SelectField } from "@/components/checkout/FormField";
import { Button } from "@/components/ui/Button";

const FIELD_ORDER: (keyof CheckoutFormData)[] = [
  "nombre",
  "apellido",
  "email",
  "telefono",
  "departamento",
  "ciudad",
  "direccion",
  "numeroPuerta",
  "nombreTitular",
  "ultimosDigitos",
];

export function CheckoutForm() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const coupon = useCartStore((s) => s.coupon);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const clearCart = useCartStore((s) => s.clearCart);

  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_CHECKOUT_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fieldRefs = useRef<Partial<Record<keyof CheckoutFormData, HTMLInputElement | HTMLSelectElement | null>>>({});

  useEffect(() => {
    if (hasHydrated && lines.length === 0 && !hasSubmitted) {
      router.replace("/carrito");
    }
  }, [hasHydrated, lines.length, hasSubmitted, router]);

  const subtotal = getCartSubtotal(lines);
  const discount = getCartDiscount(lines, coupon);
  const shipping = getCartShipping(lines, coupon);
  const total = getCartTotal(lines, coupon);

  function update<K extends keyof CheckoutFormData>(key: K, value: CheckoutFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateCheckout(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = FIELD_ORDER.find((key) => validationErrors[key]);
      if (firstErrorKey) {
        const el = fieldRefs.current[firstErrorKey];
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      const order: OrderSummary = {
        orderNumber: generateOrderNumber(),
        createdAt: new Date().toISOString(),
        lines,
        subtotal,
        discount,
        shipping,
        total,
        deliveryMethod: formData.deliveryMethod,
        paymentMethod: formData.paymentMethod,
        customerName: `${formData.nombre} ${formData.apellido}`.trim(),
        customerEmail: formData.email,
      };
      sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
      setHasSubmitted(true);
      clearCart();
      router.push("/pedido-confirmado");
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-3 border border-brand-black bg-brand-gray p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-black" aria-hidden="true" />
          <p className="text-sm text-brand-black">
            Este es un checkout de demostración. No se procesará ningún pago.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-brand-black">Datos personales</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              id="nombre"
              label="Nombre"
              value={formData.nombre}
              onChange={(e) => update("nombre", e.target.value)}
              error={errors.nombre}
              ref={(el) => {
                fieldRefs.current.nombre = el;
              }}
              autoComplete="given-name"
            />
            <FormField
              id="apellido"
              label="Apellido"
              value={formData.apellido}
              onChange={(e) => update("apellido", e.target.value)}
              error={errors.apellido}
              ref={(el) => {
                fieldRefs.current.apellido = el;
              }}
              autoComplete="family-name"
            />
            <FormField
              id="email"
              type="email"
              label="Correo electrónico"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
              ref={(el) => {
                fieldRefs.current.email = el;
              }}
              autoComplete="email"
            />
            <FormField
              id="telefono"
              type="tel"
              label="Teléfono"
              value={formData.telefono}
              onChange={(e) => update("telefono", e.target.value)}
              error={errors.telefono}
              ref={(el) => {
                fieldRefs.current.telefono = el;
              }}
              autoComplete="tel"
              placeholder="099 000 000"
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-brand-black">Entrega</h2>
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => update("deliveryMethod", "domicilio")}
              aria-pressed={formData.deliveryMethod === "domicilio"}
              className={cn(
                "flex items-center gap-3 border p-4 text-left",
                formData.deliveryMethod === "domicilio" ? "border-brand-black bg-brand-gray" : "border-brand-border",
              )}
            >
              <Truck className="h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-brand-black">Envío a domicilio</p>
                <p className="text-xs text-brand-muted">Recibí tu pedido donde quieras</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => update("deliveryMethod", "retiro")}
              aria-pressed={formData.deliveryMethod === "retiro"}
              className={cn(
                "flex items-center gap-3 border p-4 text-left",
                formData.deliveryMethod === "retiro" ? "border-brand-black bg-brand-gray" : "border-brand-border",
              )}
            >
              <Store className="h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-brand-black">Retiro en tienda</p>
                <p className="text-xs text-brand-muted">Sin costo adicional</p>
              </div>
            </button>
          </div>

          {formData.deliveryMethod === "domicilio" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                id="departamento"
                label="Departamento"
                value={formData.departamento}
                onChange={(e) => update("departamento", e.target.value)}
                error={errors.departamento}
                ref={(el) => {
                  fieldRefs.current.departamento = el;
                }}
              >
                <option value="">Seleccioná un departamento</option>
                {URUGUAY_DEPARTMENTS.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </SelectField>
              <FormField
                id="ciudad"
                label="Ciudad"
                value={formData.ciudad}
                onChange={(e) => update("ciudad", e.target.value)}
                error={errors.ciudad}
                ref={(el) => {
                  fieldRefs.current.ciudad = el;
                }}
              />
              <FormField
                id="direccion"
                label="Dirección"
                value={formData.direccion}
                onChange={(e) => update("direccion", e.target.value)}
                error={errors.direccion}
                ref={(el) => {
                  fieldRefs.current.direccion = el;
                }}
                className="sm:col-span-2"
              />
              <FormField
                id="numeroPuerta"
                label="Número de puerta"
                value={formData.numeroPuerta}
                onChange={(e) => update("numeroPuerta", e.target.value)}
                error={errors.numeroPuerta}
                ref={(el) => {
                  fieldRefs.current.numeroPuerta = el;
                }}
              />
              <FormField
                id="apartamento"
                label="Apartamento"
                optional
                value={formData.apartamento}
                onChange={(e) => update("apartamento", e.target.value)}
              />
              <FormField
                id="codigoPostal"
                label="Código postal"
                optional
                value={formData.codigoPostal}
                onChange={(e) => update("codigoPostal", e.target.value)}
              />
              <FormField
                id="notas"
                label="Notas de entrega"
                optional
                value={formData.notas}
                onChange={(e) => update("notas", e.target.value)}
                className="sm:col-span-2"
                placeholder="Ej: timbre no funciona, dejar en portería"
              />
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-brand-black">Método de pago</h2>
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => update("paymentMethod", "tarjeta")}
              aria-pressed={formData.paymentMethod === "tarjeta"}
              className={cn(
                "flex items-center gap-3 border p-4 text-left",
                formData.paymentMethod === "tarjeta" ? "border-brand-black bg-brand-gray" : "border-brand-border",
              )}
            >
              <CreditCard className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium text-brand-black">Tarjeta</p>
            </button>
            <button
              type="button"
              onClick={() => update("paymentMethod", "transferencia")}
              aria-pressed={formData.paymentMethod === "transferencia"}
              className={cn(
                "flex items-center gap-3 border p-4 text-left",
                formData.paymentMethod === "transferencia" ? "border-brand-black bg-brand-gray" : "border-brand-border",
              )}
            >
              <Landmark className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium text-brand-black">Transferencia</p>
            </button>
            <button
              type="button"
              onClick={() => update("paymentMethod", "retiro")}
              aria-pressed={formData.paymentMethod === "retiro"}
              className={cn(
                "flex items-center gap-3 border p-4 text-left",
                formData.paymentMethod === "retiro" ? "border-brand-black bg-brand-gray" : "border-brand-border",
              )}
            >
              <Store className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium text-brand-black">Pago al retirar</p>
            </button>
          </div>

          {formData.paymentMethod === "tarjeta" && (
            <div className="grid grid-cols-1 gap-4 border border-brand-border p-4 sm:grid-cols-2">
              <p className="text-xs text-brand-muted sm:col-span-2">
                Campos de demostración. No ingreses datos reales de tu tarjeta.
              </p>
              <FormField
                id="nombreTitular"
                label="Nombre del titular"
                value={formData.nombreTitular}
                onChange={(e) => update("nombreTitular", e.target.value)}
                error={errors.nombreTitular}
                ref={(el) => {
                  fieldRefs.current.nombreTitular = el;
                }}
                className="sm:col-span-2"
              />
              <FormField
                id="ultimosDigitos"
                label="Últimos 4 dígitos (demo)"
                value={formData.ultimosDigitos}
                onChange={(e) => update("ultimosDigitos", e.target.value.replace(/\D/g, "").slice(0, 4))}
                error={errors.ultimosDigitos}
                ref={(el) => {
                  fieldRefs.current.ultimosDigitos = el;
                }}
                inputMode="numeric"
                placeholder="0000"
              />
              <SelectField
                id="cuotas"
                label="Cuotas"
                value={formData.cuotas}
                onChange={(e) => update("cuotas", e.target.value)}
              >
                {INSTALLMENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </SelectField>
            </div>
          )}

          {formData.paymentMethod === "transferencia" && (
            <p className="border border-brand-border p-4 text-sm text-brand-muted">
              Te enviaremos los datos bancarios ficticios para realizar la transferencia una vez confirmado el
              pedido.
            </p>
          )}

          {formData.paymentMethod === "retiro" && (
            <p className="border border-brand-border p-4 text-sm text-brand-muted">
              Pagás en efectivo o con tarjeta al momento de retirar tu pedido en el local.
            </p>
          )}
        </section>
      </div>

      <aside className="h-fit border border-brand-border p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-black">Resumen del pedido</h2>
        <ul className="mb-4 flex max-h-72 flex-col gap-3 overflow-y-auto">
          {lines.map((line) => (
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
        <Button type="submit" variant="accent" size="lg" fullWidth className="mt-5" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : "Confirmar pedido"}
        </Button>
      </aside>
    </form>
  );
}
