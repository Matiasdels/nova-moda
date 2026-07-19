"use client";

import { cn } from "@/lib/utils";

export function SizeSelector({
  sizes,
  availableStock,
  selected,
  onSelect,
  onOpenGuide,
}: {
  sizes: string[];
  availableStock: Record<string, number>;
  selected: string | null;
  onSelect: (size: string) => void;
  onOpenGuide?: () => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-brand-black">Talle</p>
        {onOpenGuide && (
          <button
            type="button"
            onClick={onOpenGuide}
            className="text-xs font-medium text-brand-black underline underline-offset-2 hover:text-brand-red focus-ring"
          >
            Guía de talles
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const stock = availableStock[size] ?? 0;
          const available = stock > 0;
          return (
            <button
              key={size}
              type="button"
              disabled={!available}
              onClick={() => onSelect(size)}
              aria-pressed={selected === size}
              className={cn(
                "flex h-11 min-w-11 items-center justify-center border px-3 text-sm transition-colors focus-ring",
                !available && "cursor-not-allowed border-brand-border text-brand-border line-through",
                available && selected === size && "border-brand-black bg-brand-black text-brand-white",
                available && selected !== size && "border-brand-border text-brand-black hover:border-brand-black",
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
