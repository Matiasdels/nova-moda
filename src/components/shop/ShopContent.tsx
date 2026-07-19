"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, SearchX } from "lucide-react";
import { products } from "@/data/products";
import {
  applyFilters,
  filtersToSearchParams,
  parseFiltersFromSearchParams,
  type ShopFilters,
} from "@/lib/shopFilters";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { SortSelect } from "@/components/shop/SortSelect";
import { ActiveFilterChips } from "@/components/shop/ActiveFilterChips";
import { Button } from "@/components/ui/Button";

export function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams]);
  const results = useMemo(() => applyFilters(products, filters), [filters]);

  const updateFilters = useCallback(
    (next: Partial<ShopFilters>) => {
      const merged: ShopFilters = { ...filters, ...next };
      const params = filtersToSearchParams(merged);
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [filters, pathname, router],
  );

  const clearFilters = useCallback(() => {
    const params = filtersToSearchParams({ ...filters, categories: [], collections: [], sizes: [], colors: [], priceMin: null, priceMax: null, onSale: false, inStock: false });
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [filters, pathname, router]);

  const activeFilterCount =
    filters.categories.length +
    filters.collections.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceMin !== null || filters.priceMax !== null ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  return (
    <div className="py-8 sm:py-10">
      <Container>
        <div className="mb-6 flex flex-col gap-2 border-b border-brand-border pb-6">
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">Tienda</h1>
          <p className="text-sm text-brand-muted">Descubrí toda nuestra colección de indumentaria y accesorios.</p>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-brand-muted">
            {results.length} {results.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex h-10 items-center gap-2 border border-brand-border px-4 text-sm text-brand-black lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] text-brand-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <SortSelect value={filters.sort} onChange={(sort) => updateFilters({ sort })} />
          </div>
        </div>

        <ActiveFilterChips filters={filters} onChange={updateFilters} onClear={clearFilters} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel filters={filters} onChange={updateFilters} onClear={clearFilters} />
            </div>
          </aside>

          <div>
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <SearchX className="h-8 w-8 text-brand-muted" aria-hidden="true" />
                <div>
                  <p className="text-base font-medium text-brand-black">No encontramos productos con estos filtros</p>
                  <p className="mt-1 text-sm text-brand-muted">Probá quitar algunos filtros para ver más resultados.</p>
                </div>
                <Button variant="secondary" size="md" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <ProductGrid products={results} />
            )}
          </div>
        </div>
      </Container>

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onClear={clearFilters}
        resultCount={results.length}
      />
    </div>
  );
}
