"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useRecentSearchesStore } from "@/lib/store/recentSearches";

/**
 * Rehidrata manualmente los stores persistidos en localStorage.
 * Se usa `skipHydration` en cada store para evitar mismatches de
 * hidratación entre servidor y cliente en Next.js App Router.
 */
export function StoreHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useFavoritesStore.persist.rehydrate();
    useRecentSearchesStore.persist.rehydrate();
  }, []);

  return null;
}
