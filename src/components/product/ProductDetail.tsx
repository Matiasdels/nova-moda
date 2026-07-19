"use client";

import { useMemo, useRef, useState } from "react";
import { Heart, Minus, Plus, Truck, RefreshCcw } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useToastStore } from "@/lib/store/toast";
import { useUIStore } from "@/lib/store/ui";
import { isSizeAvailable, getTotalStock, cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ColorSelector } from "@/components/product/ColorSelector";
import { SizeSelector } from "@/components/product/SizeSelector";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const sizeSectionRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const isFavorite = useFavoritesStore((s) => s.productIds.includes(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const showToast = useToastStore((s) => s.showToast);
  const openCart = useUIStore((s) => s.openCart);

  const totalStock = getTotalStock(product);
  const stockForSize = selectedSize ? product.availableStock[selectedSize] ?? 0 : null;
  const maxQuantity = stockForSize ?? 10;

  const images = selectedColor.images.length > 0 ? selectedColor.images : product.images;

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      sizeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const result = addItem(product, selectedColor, selectedSize, quantity);
    if (result.success) {
      showToast("Agregado al carrito", `${product.name} · ${selectedColor.name} · Talle ${selectedSize}`, "success");
      openCart();
    } else {
      showToast("No se pudo agregar", result.message, "error");
    }
  }

  const accordionItems: AccordionItemData[] = useMemo(
    () => [
      { id: "descripcion", title: "Descripción", content: <p>{product.description}</p> },
      {
        id: "composicion",
        title: "Composición y cuidados",
        content: (
          <div className="space-y-2">
            <p>{product.composition}</p>
            <ul className="list-inside list-disc space-y-1">
              {product.careInstructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        id: "envios",
        title: "Envíos",
        content: (
          <p>
            {siteConfig.shipping.message}. Envío gratis en compras desde {siteConfig.shipping.freeShippingThreshold
              ? `$ ${siteConfig.shipping.freeShippingThreshold.toLocaleString("es-UY")}`
              : ""}
            . {siteConfig.shipping.pickupMessage}.
          </p>
        ),
      },
      {
        id: "cambios",
        title: "Cambios",
        content: <p>Cambios dentro de los {siteConfig.shipping.changesWindowDays} días de recibida tu compra.</p>,
      },
    ],
    [product],
  );

  return (
    <div className="pb-24 lg:pb-0">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={images} productName={product.name} />

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-muted">{product.category}</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-brand-black sm:text-3xl">{product.name}</h1>
            <Price price={product.price} previousPrice={product.previousPrice} size="lg" className="mt-3" />
          </div>

          <p className="text-sm leading-relaxed text-brand-muted">{product.shortDescription}</p>

          <p className={cn("text-sm font-medium", totalStock > 0 ? "text-brand-black" : "text-brand-red")}>
            {totalStock === 0 ? "Sin stock" : totalStock <= 5 ? "Últimas unidades disponibles" : "En stock"}
          </p>

          <ColorSelector colors={product.colors} selected={selectedColor.name} onSelect={setSelectedColor} />

          <div ref={sizeSectionRef}>
            <SizeSelector
              sizes={product.sizes}
              availableStock={product.availableStock}
              selected={selectedSize}
              onSelect={(size) => {
                setSelectedSize(size);
                setSizeError(false);
                setQuantity(1);
              }}
              onOpenGuide={() => setIsSizeGuideOpen(true)}
            />
            {sizeError && <p className="mt-2 text-sm text-brand-red">Elegí un talle antes de agregar al carrito.</p>}
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-brand-black">Cantidad</p>
            <div className="flex items-center border border-brand-border" style={{ width: "fit-content" }}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Disminuir cantidad"
                className="flex h-11 w-11 items-center justify-center text-brand-black hover:bg-brand-gray focus-ring"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                disabled={quantity >= maxQuantity}
                aria-label="Aumentar cantidad"
                className="flex h-11 w-11 items-center justify-center text-brand-black hover:bg-brand-gray focus-ring disabled:opacity-30"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="hidden gap-3 sm:flex">
            <Button variant="accent" size="lg" className="flex-1" onClick={handleAddToCart} disabled={totalStock === 0}>
              {totalStock === 0 ? "Sin stock" : "Agregar al carrito"}
            </Button>
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              aria-pressed={isFavorite}
              className="flex h-14 w-14 shrink-0 items-center justify-center border border-brand-black focus-ring"
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-brand-red text-brand-red")} />
            </button>
          </div>

          <div className="flex flex-col gap-2 border-t border-brand-border pt-4 text-sm text-brand-muted">
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0" aria-hidden="true" /> {siteConfig.shipping.message}
            </p>
            <p className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4 shrink-0" aria-hidden="true" /> Cambios dentro de los{" "}
              {siteConfig.shipping.changesWindowDays} días
            </p>
          </div>

          <Accordion items={accordionItems} />
        </div>
      </div>

      {/* Barra fija de acción en móvil */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-brand-border bg-brand-white px-4 py-3 sm:hidden">
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          aria-pressed={isFavorite}
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-brand-black focus-ring"
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-brand-red text-brand-red")} />
        </button>
        <Button variant="accent" size="lg" className="flex-1" onClick={handleAddToCart} disabled={totalStock === 0}>
          {totalStock === 0 ? "Sin stock" : `Agregar · $ ${product.price.toLocaleString("es-UY")}`}
        </Button>
      </div>

      {isSizeGuideOpen && <SizeGuideModal onClose={() => setIsSizeGuideOpen(false)} />}
    </div>
  );
}
