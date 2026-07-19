import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug } from "@/data/categories";
import { Container } from "@/components/ui/Container";

const FEATURED_SLUGS = ["mujer", "hombre", "calzado", "accesorios"];

export function CategoryGrid() {
  const items = FEATURED_SLUGS.map((slug) => getCategoryBySlug(slug)).filter(Boolean);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-brand-black sm:text-3xl">Comprá por categoría</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((cat) => (
            <Link key={cat!.slug} href={`/categoria/${cat!.slug}`} className="group block">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-gray">
                <Image
                  src={cat!.image}
                  alt={cat!.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-black">{cat!.name}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
