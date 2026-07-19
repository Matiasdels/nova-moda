"use client";

import { X } from "lucide-react";
import { getProductTypes } from "@/data/products";
import type { ShopFilters } from "@/lib/shopFilters";
import { formatPrice } from "@/lib/utils";

const COLLECTION_LABELS: Record<string, string> = { mujer: "Mujer", hombre: "Hombre", unisex: "Unisex" };

type Chip = { key: string; label: string; onRemove: () => void };

export function ActiveFilterChips({
  filters,
  onChange,
  onClear,
}: {
  filters: ShopFilters;
  onChange: (next: Partial<ShopFilters>) => void;
  onClear: () => void;
}) {
  const productTypes = getProductTypes();
  const chips: Chip[] = [];

  for (const slug of filters.categories) {
    const type = productTypes.find((t) => t.slug === slug);
    chips.push({
      key: `cat-${slug}`,
      label: type?.name ?? slug,
      onRemove: () => onChange({ categories: filters.categories.filter((c) => c !== slug) }),
    });
  }

  for (const slug of filters.collections) {
    chips.push({
      key: `col-${slug}`,
      label: COLLECTION_LABELS[slug] ?? slug,
      onRemove: () => onChange({ collections: filters.collections.filter((c) => c !== slug) }),
    });
  }

  for (const size of filters.sizes) {
    chips.push({
      key: `size-${size}`,
      label: `Talle ${size}`,
      onRemove: () => onChange({ sizes: filters.sizes.filter((s) => s !== size) }),
    });
  }

  for (const color of filters.colors) {
    chips.push({
      key: `color-${color}`,
      label: color,
      onRemove: () => onChange({ colors: filters.colors.filter((c) => c !== color) }),
    });
  }

  if (filters.priceMin !== null || filters.priceMax !== null) {
    const min = filters.priceMin !== null ? formatPrice(filters.priceMin) : "";
    const max = filters.priceMax !== null ? formatPrice(filters.priceMax) : "";
    chips.push({
      key: "price",
      label: `Precio: ${min || "$ 0"} — ${max || "máx"}`,
      onRemove: () => onChange({ priceMin: null, priceMax: null }),
    });
  }

  if (filters.onSale) {
    chips.push({ key: "sale", label: "En oferta", onRemove: () => onChange({ onSale: false }) });
  }

  if (filters.inStock) {
    chips.push({ key: "stock", label: "Con disponibilidad", onRemove: () => onChange({ inStock: false }) });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 border border-brand-border px-3 py-1.5 text-xs text-brand-black hover:border-brand-black"
        >
          {chip.label}
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      ))}
      <button type="button" onClick={onClear} className="text-xs font-medium text-brand-red hover:underline">
        Limpiar todo
      </button>
    </div>
  );
}
