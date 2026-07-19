"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { ShopFilters } from "@/lib/shopFilters";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  onClear,
  resultCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: ShopFilters;
  onChange: (next: Partial<ShopFilters>) => void;
  onClear: () => void;
  resultCount: number;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div className={cn("fixed inset-0 z-[70] lg:hidden", isOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        onClick={onClose}
        className={cn("absolute inset-0 bg-brand-black/40 transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-brand-white transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-brand-border px-4 py-4">
          <h2 className="text-base font-semibold uppercase tracking-wide">Filtros</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar filtros" className="flex h-9 w-9 items-center justify-center focus-ring">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <FilterPanel filters={filters} onChange={onChange} onClear={onClear} />
        </div>
        <div className="border-t border-brand-border px-4 py-4">
          <Button variant="primary" size="lg" fullWidth onClick={onClose}>
            Ver {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
          </Button>
        </div>
      </div>
    </div>
  );
}
