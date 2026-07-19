import { cn } from "@/lib/utils";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";

export function Price({
  price,
  previousPrice,
  size = "md",
  className,
}: {
  price: number;
  previousPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const discount = calculateDiscountPercentage(price, previousPrice);
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-semibold text-brand-black", sizeClasses)}>{formatPrice(price)}</span>
      {discount > 0 && previousPrice && (
        <>
          <span className="text-sm text-brand-muted line-through">{formatPrice(previousPrice)}</span>
          <span className="text-sm font-semibold text-brand-red">-{discount}%</span>
        </>
      )}
    </div>
  );
}
