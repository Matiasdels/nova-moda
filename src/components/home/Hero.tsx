import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

const HERO_IMAGE = "https://placehold.co/1400x1600/050503/FFFFFF?font=montserrat&text=NOVA%20MODA%0ATemporada%20Nueva";

export function Hero() {
  return (
    <section className="border-b border-brand-border">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative order-1 aspect-[4/5] w-full lg:order-2 lg:aspect-auto">
          <Image src={HERO_IMAGE} alt="Colección NOVA MODA temporada actual" fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div className="order-2 flex flex-col justify-center gap-6 bg-brand-white px-6 py-12 sm:px-10 lg:order-1 lg:px-16 lg:py-0">
          <h1 className="max-w-md text-balance font-display text-4xl font-extrabold leading-[1.05] text-brand-black sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-brand-muted">{siteConfig.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/tienda" variant="primary" size="lg">
              Comprar ahora
            </Button>
            <Button href="/categoria/nuevos-ingresos" variant="secondary" size="lg">
              Ver colección
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
