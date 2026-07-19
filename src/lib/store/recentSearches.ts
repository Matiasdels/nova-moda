import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const MAX_RECENT_SEARCHES = 6;

type RecentSearchesState = {
  searches: string[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addSearch: (term: string) => void;
  removeSearch: (term: string) => void;
  clearSearches: () => void;
};

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set, get) => ({
      searches: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addSearch: (term) => {
        const normalized = term.trim();
        if (!normalized || normalized.length < 2) return;
        const withoutDuplicate = get().searches.filter(
          (s) => s.toLowerCase() !== normalized.toLowerCase(),
        );
        set({ searches: [normalized, ...withoutDuplicate].slice(0, MAX_RECENT_SEARCHES) });
      },

      removeSearch: (term) => {
        set({ searches: get().searches.filter((s) => s !== term) });
      },

      clearSearches: () => set({ searches: [] }),
    }),
    {
      name: "nova-moda-recent-searches",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ searches: state.searches }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
