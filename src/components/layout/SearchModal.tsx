"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Clock, SearchX } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";
import { useRecentSearchesStore } from "@/lib/store/recentSearches";
import { searchProducts } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";

export function SearchModal() {
  const isOpen = useUIStore((s) => s.isSearchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const searches = useRecentSearchesStore((s) => s.searches);
  const addSearch = useRecentSearchesStore((s) => s.addSearch);
  const removeSearch = useRecentSearchesStore((s) => s.removeSearch);
  const clearSearches = useRecentSearchesStore((s) => s.clearSearches);

  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(-1);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
        addSearch(query);
        close();
        window.location.href = `/producto/${results[activeIndex].slug}`;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, results, activeIndex, addSearch, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Buscar productos">
      <div className="absolute inset-0 bg-brand-black/40" onClick={close} />
      <div className="absolute inset-x-0 top-0 max-h-[85vh] overflow-y-auto bg-brand-white shadow-sm animate-slide-up">
        <div className="container-page flex items-center gap-3 border-b border-brand-border py-4">
          <Search className="h-5 w-5 shrink-0 text-brand-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onBlur={() => {
              if (query.trim().length >= 2) addSearch(query);
            }}
            placeholder="Buscar remeras, camperas, calzado..."
            className="flex-1 bg-transparent text-base text-brand-black placeholder:text-brand-muted focus:outline-none"
            aria-label="Buscar productos"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar búsqueda"
            className="flex h-9 w-9 shrink-0 items-center justify-center focus-ring"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="container-page py-6">
          {query.trim().length === 0 && (
            <div>
              {searches.length > 0 ? (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                      Búsquedas recientes
                    </h3>
                    <button
                      type="button"
                      onClick={clearSearches}
                      className="text-xs font-medium text-brand-red hover:underline focus-ring"
                    >
                      Limpiar todo
                    </button>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {searches.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="group flex items-center gap-2 border border-brand-border px-3 py-1.5 text-sm text-brand-black hover:border-brand-black"
                        >
                          <Clock className="h-3.5 w-3.5 text-brand-muted" aria-hidden="true" />
                          {term}
                          <span
                            role="button"
                            tabIndex={0}
                            aria-label={`Eliminar búsqueda ${term}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSearch(term);
                            }}
                            className="ml-1 text-brand-muted hover:text-brand-red"
                          >
                            <X className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-brand-muted">Empezá a escribir para buscar productos.</p>
              )}
            </div>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <SearchX className="h-8 w-8 text-brand-muted" aria-hidden="true" />
              <p className="text-sm text-brand-muted">
                No encontramos resultados para <span className="font-medium text-brand-black">&quot;{query}&quot;</span>
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="flex flex-col divide-y divide-brand-border">
              {results.map((product, index) => (
                <li key={product.id}>
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={() => {
                      addSearch(query);
                      close();
                    }}
                    className={cn(
                      "flex items-center gap-4 py-3 focus-ring",
                      activeIndex === index && "bg-brand-gray",
                    )}
                  >
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-brand-gray">
                      <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-brand-black">{product.name}</p>
                      <p className="text-xs text-brand-muted">{product.category}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-brand-black">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
