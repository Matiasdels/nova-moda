import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-2xl">
        <h1 className="mb-2 font-display text-3xl font-bold text-brand-black">Términos y condiciones</h1>
        <p className="mb-8 text-sm text-brand-muted">Contenido de referencia para esta plantilla de demostración.</p>

        <div className="space-y-6 text-sm leading-relaxed text-brand-muted">
          <p>
            Este sitio es una plantilla de demostración creada con fines ilustrativos. {siteConfig.name} no
            representa una empresa real y los términos aquí descritos son de carácter ficticio.
          </p>
          <p>
            Al utilizar este sitio, aceptás que los productos, precios, stock y promociones mostrados son
            simulados y no constituyen una oferta comercial real.
          </p>
          <p>
            Ninguna compra realizada en este sitio genera un cargo real ni un envío efectivo de productos. El
            checkout es únicamente demostrativo.
          </p>
          <p>
            Esta plantilla puede adaptarse y personalizarse para representar un comercio real, en cuyo caso
            deberán reemplazarse estos textos por información legal verídica.
          </p>
        </div>
      </Container>
    </div>
  );
}
