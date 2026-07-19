import { Truck, RefreshCcw, ShieldCheck, Headphones } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const BENEFITS = [
  {
    icon: Truck,
    title: siteConfig.shipping.message,
    description: "Recibí tu pedido en la puerta de tu casa en todo el país.",
  },
  {
    icon: RefreshCcw,
    title: `Cambios dentro de los ${siteConfig.shipping.changesWindowDays} días`,
    description: "Si algo no te queda como esperabas, lo cambiamos sin complicaciones.",
  },
  {
    icon: ShieldCheck,
    title: "Compra protegida",
    description: "Tus datos y tu compra siempre resguardados.",
  },
  {
    icon: Headphones,
    title: "Atención personalizada",
    description: "Estamos para ayudarte antes, durante y después de tu compra.",
  },
];

export function Benefits() {
  return (
    <section className="bg-brand-gray py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-start gap-3">
              <benefit.icon className="h-6 w-6 text-brand-red" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-brand-black">{benefit.title}</h3>
              <p className="text-sm text-brand-muted">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
