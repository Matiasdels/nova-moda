import { CompassIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="flex flex-col items-center gap-5 text-center">
        <span className="font-display text-7xl font-extrabold text-brand-black sm:text-8xl">
          4<span className="text-brand-red">0</span>4
        </span>
        <CompassIcon className="h-6 w-6 text-brand-muted" aria-hidden="true" />
        <h1 className="text-xl font-semibold text-brand-black">No encontramos esta página</h1>
        <p className="max-w-sm text-sm text-brand-muted">
          El enlace que seguiste puede estar roto o la página pudo haberse movido. Volvé a la tienda y seguí
          explorando.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="md">
            Ir al inicio
          </Button>
          <Button href="/tienda" variant="secondary" size="md">
            Ir a la tienda
          </Button>
        </div>
      </Container>
    </div>
  );
}
