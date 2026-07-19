import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { EditorialSection } from "@/components/home/EditorialSection";
import { Benefits } from "@/components/home/Benefits";
import { Newsletter } from "@/components/home/Newsletter";
import { getNewArrivals, getBestSellers } from "@/data/products";

export default function HomePage() {
  const newArrivals = getNewArrivals(8);
  const bestSellers = getBestSellers(8);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSection
        title="Nuevos ingresos"
        description="Lo último en llegar a NOVA MODA"
        viewAllHref="/categoria/nuevos-ingresos"
        products={newArrivals}
      />
      <PromoBanner />
      <ProductSection
        title="Más vendidos"
        description="Los favoritos de nuestra comunidad"
        viewAllHref="/tienda?orden=recomendados"
        products={bestSellers}
      />
      <EditorialSection />
      <Benefits />
      <Newsletter />
    </>
  );
}
