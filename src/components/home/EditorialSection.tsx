import Image from "next/image";
import { Button } from "@/components/ui/Button";

const EDITORIAL_IMAGE = "https://placehold.co/1200x1400/F6F6F6/050503?font=montserrat&text=B%C3%A1sicos%20NOVA%20MODA";

export function EditorialSection() {
  return (
    <section className="border-y border-brand-border">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full lg:aspect-auto">
          <Image
            src={EDITORIAL_IMAGE}
            alt="Básicos NOVA MODA"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 bg-brand-white px-6 py-14 sm:px-10 lg:px-16">
          <h2 className="max-w-sm text-balance font-display text-3xl font-bold text-brand-black sm:text-4xl">
            Básicos que combinan con todo
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-brand-muted">
            Una selección de prendas versátiles, pensadas para combinarse entre sí y armar looks distintos todos los
            días sin esfuerzo.
          </p>
          <Button href="/tienda" variant="primary" size="lg" className="w-fit">
            Explorar básicos
          </Button>
        </div>
      </div>
    </section>
  );
}
