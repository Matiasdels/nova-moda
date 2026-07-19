"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag } from "lucide-react";
import { categories } from "@/data/categories";
import { useUIStore } from "@/lib/store/ui";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const isOpen = useUIStore((s) => s.isMobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] lg:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-brand-black/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          "absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-brand-white transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-brand-border px-4 py-4">
          <span className="font-display text-lg font-extrabold">
            <span className="text-brand-black">{siteConfig.shortName}</span>
            <span className="text-brand-red">{siteConfig.accentName}</span>
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar menú"
            className="flex h-9 w-9 items-center justify-center focus-ring"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col divide-y divide-brand-border">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  onClick={close}
                  className={cn(
                    "flex items-center py-3.5 text-base font-medium",
                    cat.highlight ? "text-brand-red" : "text-brand-black",
                  )}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tienda" onClick={close} className="flex items-center py-3.5 text-base font-medium text-brand-black">
                Ver toda la tienda
              </Link>
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 border-t border-brand-border pt-6">
            <Link href="/favoritos" onClick={close} className="flex items-center gap-3 text-sm font-medium text-brand-black">
              <Heart className="h-5 w-5" aria-hidden="true" />
              Favoritos
            </Link>
            <Link href="/carrito" onClick={close} className="flex items-center gap-3 text-sm font-medium text-brand-black">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              Carrito
            </Link>
          </div>
        </nav>

        <div className="border-t border-brand-border px-4 py-4 text-xs text-brand-muted">
          <p>{siteConfig.shipping.message}</p>
          <p>{siteConfig.contact.email}</p>
        </div>
      </div>
    </div>
  );
}
