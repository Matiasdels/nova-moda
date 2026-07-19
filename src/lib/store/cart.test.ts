import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore, getCartTotal, getCartSubtotal } from "@/lib/store/cart";
import type { Product } from "@/lib/types";

const mockProduct: Product = {
  id: "test-1",
  slug: "remera-test",
  name: "Remera Test",
  shortDescription: "Remera de prueba",
  description: "Remera de prueba para tests",
  category: "Remeras",
  categorySlug: "remeras",
  collection: "unisex",
  price: 1000,
  images: ["https://example.com/1.jpg", "https://example.com/2.jpg"],
  colors: [
    { name: "Negro", hex: "#000000", images: ["https://example.com/negro.jpg"] },
    { name: "Blanco", hex: "#FFFFFF", images: ["https://example.com/blanco.jpg"] },
  ],
  sizes: ["S", "M", "L"],
  availableStock: { S: 2, M: 0, L: 5 },
  tags: ["remera", "test"],
  createdAt: "2026-01-01",
  composition: "100% algodón",
  careInstructions: ["Lavar a máquina"],
};

const black = mockProduct.colors[0];

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ lines: [], coupon: null, couponError: null });
  });

  it("agrega un producto nuevo al carrito", () => {
    const result = useCartStore.getState().addItem(mockProduct, black, "S", 1);
    expect(result.success).toBe(true);
    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0].quantity).toBe(1);
  });

  it("suma la cantidad si se agrega el mismo producto, color y talle", () => {
    useCartStore.getState().addItem(mockProduct, black, "S", 1);
    useCartStore.getState().addItem(mockProduct, black, "S", 1);
    const lines = useCartStore.getState().lines;
    expect(lines).toHaveLength(1);
    expect(lines[0].quantity).toBe(2);
  });

  it("crea una línea separada si cambia el talle", () => {
    useCartStore.getState().addItem(mockProduct, black, "S", 1);
    useCartStore.getState().addItem(mockProduct, black, "L", 1);
    expect(useCartStore.getState().lines).toHaveLength(2);
  });

  it("no permite agregar más unidades que el stock disponible", () => {
    useCartStore.getState().addItem(mockProduct, black, "S", 2);
    const result = useCartStore.getState().addItem(mockProduct, black, "S", 1);
    expect(result.success).toBe(false);
    expect(useCartStore.getState().lines[0].quantity).toBe(2);
  });

  it("rechaza agregar un talle sin stock", () => {
    const result = useCartStore.getState().addItem(mockProduct, black, "M", 1);
    expect(result.success).toBe(false);
    expect(useCartStore.getState().lines).toHaveLength(0);
  });

  it("aplica el cupón NOVA10 y calcula el descuento", () => {
    useCartStore.getState().addItem(mockProduct, black, "S", 1);
    const result = useCartStore.getState().applyCoupon("nova10");
    expect(result.success).toBe(true);
    expect(useCartStore.getState().coupon?.discountPercentage).toBe(10);
  });

  it("rechaza un cupón inválido", () => {
    const result = useCartStore.getState().applyCoupon("INVALIDO");
    expect(result.success).toBe(false);
    expect(useCartStore.getState().coupon).toBeNull();
  });

  it("calcula el envío gratis a partir del umbral configurado", () => {
    useCartStore.getState().addItem(mockProduct, black, "S", 1);
    useCartStore.getState().addItem(mockProduct, black, "L", 5);
    const { lines, coupon } = useCartStore.getState();
    const subtotal = getCartSubtotal(lines);
    expect(subtotal).toBeGreaterThanOrEqual(4000);
    expect(getCartTotal(lines, coupon)).toBe(subtotal);
  });

  it("vacía el carrito y el cupón con clearCart", () => {
    useCartStore.getState().addItem(mockProduct, black, "S", 1);
    useCartStore.getState().applyCoupon("NOVA10");
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().lines).toHaveLength(0);
    expect(useCartStore.getState().coupon).toBeNull();
  });
});
