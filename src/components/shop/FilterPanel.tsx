"use client";

import { getProductTypes, getAvailableColors, getAvailableSizes, getPriceRange } from "@/data/products";
import type { ShopFilters } from "@/lib/shopFilters";
import { formatPrice, cn } from "@/lib/utils";

const COLLECTIONS: { slug: "mujer" | "hombre" | "unisex"; label: string }[] = [
  { slug: "mujer", label: "Mujer" },
  { slug: "hombre", label: "Hombre" },
  { slug: "unisex", label: "Unisex" },
];

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterPanel({
  filters,
  onChange,
  onClear,
}: {
  filters: ShopFilters;
  onChange: (next: Partial<ShopFilters>) => void;
  onClear: () => void;
}) {
  const productTypes = getProductTypes();
  const colors = getAvailableColors();
  const sizes = getAvailableSizes();
  const priceRange = getPriceRange();

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.collections.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.onSale ||
    filters.inStock;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-black">Filtros</h2>
        {hasActiveFilters && (
          <button type="button" onClick={onClear} className="text-xs font-medium text-brand-red hover:underline">
            Limpiar todo
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">Categoría</legend>
        <div className="flex flex-col gap-2.5">
          {productTypes.map((type) => (
            <label key={type.slug} className="flex items-center gap-2.5 text-sm text-brand-black">
              <input
                type="checkbox"
                checked={filters.categories.includes(type.slug)}
                onChange={() => onChange({ categories: toggleValue(filters.categories, type.slug) })}
                className="h-4 w-4 accent-brand-black"
              />
              {type.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">Género / Colección</legend>
        <div className="flex flex-col gap-2.5">
          {COLLECTIONS.map((c) => (
            <label key={c.slug} className="flex items-center gap-2.5 text-sm text-brand-black">
              <input
                type="checkbox"
                checked={filters.collections.includes(c.slug)}
                onChange={() => onChange({ collections: toggleValue(filters.collections, c.slug) })}
                className="h-4 w-4 accent-brand-black"
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">Talle</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onChange({ sizes: toggleValue(filters.sizes, size) })}
              aria-pressed={filters.sizes.includes(size)}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center border px-2 text-xs",
                filters.sizes.includes(size)
                  ? "border-brand-black bg-brand-black text-brand-white"
                  : "border-brand-border text-brand-black hover:border-brand-black",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">Color</legend>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => onChange({ colors: toggleValue(filters.colors, color.name) })}
              aria-pressed={filters.colors.includes(color.name)}
              title={color.name}
              aria-label={color.name}
              className={cn(
                "flex h-8 w-8 items-center justify-center border-2",
                filters.colors.includes(color.name) ? "border-brand-black" : "border-transparent",
              )}
            >
              <span className="h-6 w-6 rounded-full border border-brand-border" style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
          Precio ({formatPrice(priceRange.min)} — {formatPrice(priceRange.max)})
        </legend>
        <div className="flex items-center gap-3">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Mín"
            value={filters.priceMin ?? ""}
            onChange={(e) => onChange({ priceMin: e.target.value ? Number(e.target.value) : null })}
            className="h-9 w-full border border-brand-border px-2 text-sm focus:border-brand-black"
            aria-label="Precio mínimo"
          />
          <span className="text-brand-muted">—</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Máx"
            value={filters.priceMax ?? ""}
            onChange={(e) => onChange({ priceMax: e.target.value ? Number(e.target.value) : null })}
            className="h-9 w-full border border-brand-border px-2 text-sm focus:border-brand-black"
            aria-label="Precio máximo"
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <label className="flex items-center gap-2.5 text-sm text-brand-black">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={(e) => onChange({ onSale: e.target.checked })}
            className="h-4 w-4 accent-brand-red"
          />
          Solo ofertas
        </label>
        <label className="flex items-center gap-2.5 text-sm text-brand-black">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onChange({ inStock: e.target.checked })}
            className="h-4 w-4 accent-brand-black"
          />
          Solo con disponibilidad
        </label>
      </fieldset>
    </div>
  );
}
