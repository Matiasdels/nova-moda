import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/lib/types";

const BADGE_STYLES: Record<ProductBadge, string> = {
  Nuevo: "bg-brand-black text-brand-white",
  Oferta: "bg-brand-red text-brand-white",
  "Últimas unidades": "bg-brand-white text-brand-black border border-brand-black",
};

export function Badge({ label, className }: { label: ProductBadge; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-[11px] font-semibold uppercase tracking-wide",
        BADGE_STYLES[label],
        className,
      )}
    >
      {label}
    </span>
  );
}

export function DiscountBadge({ percentage, className }: { percentage: number; className?: string }) {
  if (percentage <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center bg-brand-red px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-white",
        className,
      )}
    >
      -{percentage}%
    </span>
  );
}
