import { ChevronDown } from "lucide-react";
import { SORT_LABELS } from "@/lib/shopFilters";
import type { SortOption } from "@/lib/types";

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Ordenar productos
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-10 appearance-none border border-brand-border bg-brand-white pl-3 pr-9 text-sm text-brand-black focus:border-brand-black focus:outline-none"
      >
        {Object.entries(SORT_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
    </div>
  );
}
