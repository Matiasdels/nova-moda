import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductSection } from "@/components/home/ProductSection";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <ProductDetail product={product} />
      </Container>
      {related.length > 0 && (
        <ProductSection title="También te puede interesar" viewAllHref="/tienda" products={related} />
      )}
    </div>
  );
}
