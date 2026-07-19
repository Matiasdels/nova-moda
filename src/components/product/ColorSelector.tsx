import type { ProductColor } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: ProductColor[];
  selected: string;
  onSelect: (color: ProductColor) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-brand-black">
        Color: <span className="font-normal text-brand-muted">{selected}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelect(color)}
            aria-label={`Color ${color.name}`}
            aria-pressed={selected === color.name}
            title={color.name}
            className={cn(
              "flex h-9 w-9 items-center justify-center border-2 transition-colors focus-ring",
              selected === color.name ? "border-brand-black" : "border-transparent",
            )}
          >
            <span
              className="h-7 w-7 rounded-full border border-brand-border"
              style={{ backgroundColor: color.hex }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
