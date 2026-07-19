import Link from "next/link";
import type { Product } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";

export function ProductSection({
  title,
  description,
  viewAllHref,
  products,
}: {
  title: string;
  description?: string;
  viewAllHref: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-black sm:text-3xl">{title}</h2>
            {description && <p className="mt-1 text-sm text-brand-muted">{description}</p>}
          </div>
          <Link href={viewAllHref} className="link-underline hidden shrink-0 text-sm font-medium text-brand-black sm:block">
            Ver todo
          </Link>
        </div>
        <ProductGrid products={products} />
        <Link href={viewAllHref} className="mt-8 block text-center text-sm font-medium text-brand-black underline sm:hidden">
          Ver todo
        </Link>
      </Container>
    </section>
  );
}
