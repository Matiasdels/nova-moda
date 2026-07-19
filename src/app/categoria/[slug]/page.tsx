import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsForStorefrontCategory } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const productList = getProductsForStorefrontCategory(slug);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <nav aria-label="Categorías" className="mb-6 flex flex-wrap gap-2 border-b border-brand-border pb-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className={cn(
                "border px-3.5 py-1.5 text-sm",
                c.slug === slug
                  ? "border-brand-black bg-brand-black text-brand-white"
                  : "border-brand-border text-brand-black hover:border-brand-black",
                c.highlight && c.slug !== slug && "text-brand-red",
              )}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">{category!.name}</h1>
          <p className="mt-2 text-sm text-brand-muted">{category!.description}</p>
          <p className="mt-1 text-sm text-brand-muted">
            {productList.length} {productList.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>
        </div>

        {productList.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="Todavía no hay productos acá"
            description="Estamos preparando nuevas prendas para esta categoría. Mientras tanto, mirá el resto de la tienda."
            actionLabel="Ir a la tienda"
            actionHref="/tienda"
          />
        ) : (
          <ProductGrid products={productList} />
        )}
      </Container>
    </div>
  );
}
