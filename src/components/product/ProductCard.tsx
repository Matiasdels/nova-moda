"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useCartStore } from "@/lib/store/cart";
import { useToastStore } from "@/lib/store/toast";
import { isSizeAvailable, cn } from "@/lib/utils";
import { Price } from "@/components/ui/Price";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  const isFavorite = useFavoritesStore((s) => s.productIds.includes(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.showToast);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const secondImage = product.images[1] ?? product.images[0];
  const mainImage = product.images[0];
  const defaultColor = product.colors[0];

  function handleQuickAdd() {
    if (!showSizes) {
      setShowSizes(true);
      return;
    }
    if (!selectedSize) {
      setSizeError(true);
      window.setTimeout(() => setSizeError(false), 1500);
      return;
    }
    const result = addItem(product, defaultColor, selectedSize, 1);
    if (result.success) {
      showToast("Agregado al carrito", `${product.name} · Talle ${selectedSize}`, "success");
      setShowSizes(false);
      setSelectedSize(null);
    } else {
      showToast("No se pudo agregar", result.message, "error");
    }
  }

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-gray">
        <Link href={`/producto/${product.slug}`} className="absolute inset-0 block" aria-label={product.name}>
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
            priority={false}
          />
          <Image
            src={secondImage}
            alt=""
            fill
            aria-hidden="true"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>

        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {product.badge && <Badge label={product.badge} />}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          aria-pressed={isFavorite}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-brand-white/90 text-brand-black focus-ring"
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-brand-red text-brand-red")} />
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <p className="text-xs uppercase tracking-wide text-brand-muted">{product.category}</p>
        <Link href={`/producto/${product.slug}`} className="text-sm font-medium text-brand-black hover:underline">
          {product.name}
        </Link>
        <Price price={product.price} previousPrice={product.previousPrice} size="sm" className="mt-1" />
      </div>

      <div className="mt-3">
        {showSizes && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {product.sizes.map((size) => {
              const available = isSizeAvailable(product, size);
              return (
                <button
                  key={size}
                  type="button"
                  disabled={!available}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={cn(
                    "flex h-7 min-w-7 items-center justify-center border px-1.5 text-xs",
                    !available && "cursor-not-allowed border-brand-border text-brand-border line-through",
                    available && selectedSize === size && "border-brand-black bg-brand-black text-brand-white",
                    available && selectedSize !== size && "border-brand-border text-brand-black hover:border-brand-black",
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
        {sizeError && <p className="mb-2 text-[11px] text-brand-red">Elegí un talle para continuar</p>}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="flex h-10 w-full items-center justify-center gap-2 border border-brand-black text-xs font-medium uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-black hover:text-brand-white focus-ring"
        >
          <ShoppingBag className="h-4 w-4" />
          {showSizes ? "Confirmar talle" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
