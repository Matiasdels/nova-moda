import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function PromoBanner() {
  return (
    <section className="bg-brand-red py-16 sm:py-24">
      <Container className="flex flex-col items-center gap-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-white/80">
          Ofertas por tiempo limitado
        </span>
        <h2 className="font-display text-4xl font-extrabold text-brand-white sm:text-5xl">HASTA 30% OFF</h2>
        <p className="max-w-md text-sm text-brand-white/90 sm:text-base">
          Descubrí prendas seleccionadas con precios especiales.
        </p>
        <Button href="/categoria/ofertas" variant="outline-white" size="lg" className="mt-2">
          Ver ofertas
        </Button>
      </Container>
    </section>
  );
}
