"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  simulateLoading = false,
  className,
}: {
  products: Product[];
  simulateLoading?: boolean;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(simulateLoading);

  useEffect(() => {
    if (!simulateLoading) return;
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const gridClasses = cn("grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4", className);

  if (isLoading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
