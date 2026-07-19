import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-2xl">
        <h1 className="mb-2 font-display text-3xl font-bold text-brand-black">Política de privacidad</h1>
        <p className="mb-8 text-sm text-brand-muted">Contenido de referencia para esta plantilla de demostración.</p>

        <div className="space-y-6 text-sm leading-relaxed text-brand-muted">
          <p>
            {siteConfig.name} es un sitio de demostración. No recopilamos, almacenamos ni compartimos datos
            personales reales con terceros.
          </p>
          <p>
            La información que ingreses en el carrito, favoritos o checkout se guarda únicamente en tu
            navegador (localStorage y sessionStorage) y nunca se envía a un servidor externo.
          </p>
          <p>
            Podés borrar esta información en cualquier momento limpiando los datos de navegación de tu
            navegador para este sitio.
          </p>
          <p>
            Si esta plantilla se adapta para un comercio real, esta política deberá reemplazarse por una
            política de privacidad conforme a la normativa vigente.
          </p>
        </div>
      </Container>
    </div>
  );
}
