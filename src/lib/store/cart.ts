import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { siteConfig } from "@/lib/config";
import type { CartLine, Product } from "@/lib/types";

export type CouponState = {
  code: string;
  discountPercentage: number;
} | null;

type CartState = {
  lines: CartLine[];
  coupon: CouponState;
  couponError: string | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addItem: (
    product: Product,
    color: { name: string; hex: string },
    size: string,
    quantity: number,
  ) => { success: boolean; message?: string };
  increaseQuantity: (lineId: string, maxStock: number) => void;
  decreaseQuantity: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number, maxStock: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
};

function buildLineId(productId: string, color: string, size: string) {
  return `${productId}__${color}__${size}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      coupon: null,
      couponError: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addItem: (product, color, size, quantity) => {
        const lineId = buildLineId(product.id, color.name, size);
        const stockForSize = product.availableStock[size] ?? 0;

        if (stockForSize <= 0) {
          return { success: false, message: "Este talle no tiene stock disponible." };
        }

        const existing = get().lines.find((l) => l.lineId === lineId);
        const currentQty = existing?.quantity ?? 0;
        const nextQty = Math.min(currentQty + quantity, stockForSize);

        if (currentQty >= stockForSize) {
          return { success: false, message: "Ya agregaste la cantidad máxima disponible de este talle." };
        }

        if (existing) {
          set({
            lines: get().lines.map((l) => (l.lineId === lineId ? { ...l, quantity: nextQty } : l)),
          });
        } else {
          const newLine: CartLine = {
            lineId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: color.name
              ? product.colors.find((c) => c.name === color.name)?.images[0] ?? product.images[0]
              : product.images[0],
            price: product.price,
            previousPrice: product.previousPrice,
            color: color.name,
            colorHex: color.hex,
            size,
            quantity: nextQty,
          };
          set({ lines: [...get().lines, newLine] });
        }

        return { success: true };
      },

      increaseQuantity: (lineId, maxStock) => {
        set({
          lines: get().lines.map((l) =>
            l.lineId === lineId ? { ...l, quantity: Math.min(l.quantity + 1, maxStock) } : l,
          ),
        });
      },

      decreaseQuantity: (lineId) => {
        set({
          lines: get()
            .lines.map((l) => (l.lineId === lineId ? { ...l, quantity: l.quantity - 1 } : l))
            .filter((l) => l.quantity > 0),
        });
      },

      updateQuantity: (lineId, quantity, maxStock) => {
        const clamped = Math.max(0, Math.min(quantity, maxStock));
        if (clamped === 0) {
          set({ lines: get().lines.filter((l) => l.lineId !== lineId) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.lineId === lineId ? { ...l, quantity: clamped } : l)),
        });
      },

      removeLine: (lineId) => {
        set({ lines: get().lines.filter((l) => l.lineId !== lineId) });
      },

      clearCart: () => {
        set({ lines: [], coupon: null, couponError: null });
      },

      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase();
        if (get().coupon) {
          const msg = "Ya aplicaste un cupón en este carrito.";
          set({ couponError: msg });
          return { success: false, message: msg };
        }
        if (normalized === siteConfig.coupon.code) {
          set({
            coupon: { code: normalized, discountPercentage: siteConfig.coupon.discountPercentage },
            couponError: null,
          });
          return { success: true, message: `Cupón ${normalized} aplicado: ${siteConfig.coupon.discountPercentage}% off.` };
        }
        const msg = "El cupón ingresado no es válido.";
        set({ couponError: msg });
        return { success: false, message: msg };
      },

      removeCoupon: () => {
        set({ coupon: null, couponError: null });
      },
    }),
    {
      name: "nova-moda-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines, coupon: state.coupon }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function getCartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

export function getCartItemCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function getCartDiscount(lines: CartLine[], coupon: CouponState): number {
  if (!coupon) return 0;
  const subtotal = getCartSubtotal(lines);
  return Math.round((subtotal * coupon.discountPercentage) / 100);
}

export function getCartShipping(lines: CartLine[], coupon: CouponState): number {
  if (lines.length === 0) return 0;
  const subtotal = getCartSubtotal(lines) - getCartDiscount(lines, coupon);
  return subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.standardShippingCost;
}

export function getCartTotal(lines: CartLine[], coupon: CouponState): number {
  const subtotal = getCartSubtotal(lines);
  const discount = getCartDiscount(lines, coupon);
  const shipping = getCartShipping(lines, coupon);
  return subtotal - discount + shipping;
}

export function getFreeShippingProgress(lines: CartLine[], coupon: CouponState): {
  remaining: number;
  progress: number;
  reached: boolean;
} {
  const subtotal = getCartSubtotal(lines) - getCartDiscount(lines, coupon);
  const threshold = siteConfig.shipping.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
  return { remaining, progress, reached: remaining === 0 };
}
