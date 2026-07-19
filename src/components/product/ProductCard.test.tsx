import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import type { Product } from "@/lib/types";

const mockProduct: Product = {
  id: "test-card-1",
  slug: "campera-test",
  name: "Campera Test",
  shortDescription: "Campera de prueba",
  description: "Campera de prueba para tests",
  category: "Camperas",
  categorySlug: "camperas",
  collection: "unisex",
  price: 2000,
  previousPrice: 2500,
  images: ["https://example.com/1.jpg", "https://example.com/2.jpg"],
  colors: [{ name: "Negro", hex: "#000000", images: ["https://example.com/negro.jpg"] }],
  sizes: ["S", "M"],
  availableStock: { S: 3, M: 0 },
  tags: ["campera", "test"],
  badge: "Oferta",
  createdAt: "2026-01-01",
  composition: "100% poliéster",
  careInstructions: ["Lavar a máquina"],
};

describe("ProductCard", () => {
  beforeEach(() => {
    useCartStore.setState({ lines: [], coupon: null, couponError: null });
    useFavoritesStore.setState({ productIds: [] });
  });

  it("muestra nombre, categoría y precio con descuento", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Campera Test")).toBeInTheDocument();
    expect(screen.getByText("Camperas")).toBeInTheDocument();
    expect(screen.getByText("$ 2.000")).toBeInTheDocument();
    expect(screen.getByText("Oferta")).toBeInTheDocument();
  });

  it("pide seleccionar un talle antes de agregar al carrito", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    await user.click(screen.getByRole("button", { name: /agregar al carrito/i }));
    await user.click(screen.getByRole("button", { name: /confirmar talle/i }));

    expect(screen.getByText(/elegí un talle/i)).toBeInTheDocument();
    expect(useCartStore.getState().lines).toHaveLength(0);
  });

  it("agrega el producto al carrito al elegir un talle disponible", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    await user.click(screen.getByRole("button", { name: /agregar al carrito/i }));
    await user.click(screen.getByRole("button", { name: "S" }));
    await user.click(screen.getByRole("button", { name: /confirmar talle/i }));

    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0].size).toBe("S");
  });

  it("permite marcar y desmarcar como favorito", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    const favoriteButton = screen.getByRole("button", { name: /agregar a favoritos/i });
    await user.click(favoriteButton);

    expect(useFavoritesStore.getState().productIds).toContain(mockProduct.id);
  });
});
