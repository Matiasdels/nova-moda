import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FavoritesState = {
  productIds: string[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  toggleFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      toggleFavorite: (productId) => {
        const current = get().productIds;
        if (current.includes(productId)) {
          set({ productIds: current.filter((id) => id !== productId) });
        } else {
          set({ productIds: [...current, productId] });
        }
      },

      removeFavorite: (productId) => {
        set({ productIds: get().productIds.filter((id) => id !== productId) });
      },

      isFavorite: (productId) => get().productIds.includes(productId),

      clearFavorites: () => set({ productIds: [] }),
    }),
    {
      name: "nova-moda-favorites",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ productIds: state.productIds }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
