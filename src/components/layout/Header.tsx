"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Logo } from "@/components/layout/Logo";
import { categories } from "@/data/categories";
import { useUIStore } from "@/lib/store/ui";
import { useCartStore, getCartItemCount } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const openMobileMenu = useUIStore((s) => s.openMobileMenu);
  const openSearch = useUIStore((s) => s.openSearch);
  const openCart = useUIStore((s) => s.openCart);

  const cartCount = useCartStore((s) => getCartItemCount(s.lines));
  const favoritesCount = useFavoritesStore((s) => s.productIds.length);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-brand-white">
      <TopBar />
      <div
        className={cn(
          "border-b border-brand-border bg-brand-white transition-shadow duration-200",
          isScrolled && "shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
          <button
            type="button"
            onClick={openMobileMenu}
            aria-label="Abrir menú de navegación"
            className="flex h-9 w-9 items-center justify-center focus-ring lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Logo />

          <nav aria-label="Categorías principales" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {categories
                .filter((c) => c.slug !== "nuevos-ingresos")
                .map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/categoria/${cat.slug}`}
                      className={cn(
                        "link-underline text-sm font-medium uppercase tracking-wide",
                        cat.highlight ? "text-brand-red" : "text-brand-black",
                      )}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/tienda" className="link-underline text-sm font-medium uppercase tracking-wide text-brand-black">
                  Tienda
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Buscar productos"
              className="flex h-9 w-9 items-center justify-center focus-ring"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/favoritos"
              aria-label={`Favoritos (${favoritesCount})`}
              className="relative flex h-9 w-9 items-center justify-center focus-ring"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-semibold text-brand-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Carrito (${cartCount} productos)`}
              className="relative flex h-9 w-9 items-center justify-center focus-ring"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-semibold text-brand-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
