import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Cambios y devoluciones" };

export default function ChangesPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-2xl">
        <h1 className="mb-2 font-display text-3xl font-bold text-brand-black">Cambios y devoluciones</h1>
        <p className="mb-8 text-sm text-brand-muted">Contenido de referencia para esta plantilla de demostración.</p>

        <div className="space-y-6 text-sm leading-relaxed text-brand-muted">
          <p>
            Tenés hasta {siteConfig.shipping.changesWindowDays} días desde que recibís tu pedido para solicitar
            un cambio de talle o color, siempre que la prenda conserve sus etiquetas originales y no haya sido
            utilizada.
          </p>
          <p>{siteConfig.shipping.pickupMessage} para cambios realizados en nuestro local.</p>
          <p>
            Para cambios por envío, coordinamos el retiro de la prenda en tu domicilio y el despacho de la
            nueva prenda sin costo adicional.
          </p>
          <p>
            Como este es un sitio de demostración, ningún cambio real se procesa: esta información es
            únicamente ilustrativa del funcionamiento de la tienda.
          </p>
        </div>
      </Container>
    </div>
  );
}
