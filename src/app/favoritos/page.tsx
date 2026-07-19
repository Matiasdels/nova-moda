"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";

export default function FavoritesPage() {
  const productIds = useFavoritesStore((s) => s.productIds);
  const hasHydrated = useFavoritesStore((s) => s.hasHydrated);

  const favoriteProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mb-8 border-b border-brand-border pb-6">
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">Tus favoritos</h1>
          <p className="mt-2 text-sm text-brand-muted">
            {hasHydrated
              ? `${favoriteProducts.length} ${favoriteProducts.length === 1 ? "producto guardado" : "productos guardados"}`
              : "Cargando tus favoritos..."}
          </p>
        </div>

        {hasHydrated && favoriteProducts.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Todavía no tenés favoritos"
            description="Guardá los productos que más te gusten tocando el corazón en cualquier prenda."
            actionLabel="Ir a la tienda"
            actionHref="/tienda"
          />
        ) : (
          <ProductGrid products={favoriteProducts} />
        )}
      </Container>
    </div>
  );
}
