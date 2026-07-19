"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingresá tu correo electrónico.");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Ingresá un correo electrónico válido.");
      return;
    }
    setError(null);
    setIsSuccess(true);
    setEmail("");
  }

  return (
    <section className="bg-brand-black py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-2xl font-bold text-brand-white sm:text-3xl">Sumate a NOVA MODA</h2>
        <p className="max-w-md text-sm text-brand-white/80">
          Enterate primero de nuevos ingresos, ofertas exclusivas y novedades de la temporada.
        </p>

        {isSuccess ? (
          <div className="flex items-center gap-2 border border-brand-white/30 px-5 py-3 text-sm text-brand-white">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
            ¡Gracias por sumarte! Vas a recibir nuestras novedades pronto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="h-12 flex-1 border border-brand-white/30 bg-transparent px-4 text-sm text-brand-white placeholder:text-brand-white/50 focus:border-brand-white focus:outline-none"
              />
              <Button type="submit" variant="accent" size="lg" className="sm:w-auto">
                Suscribirme
              </Button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 text-left text-xs text-brand-red">
                {error}
              </p>
            )}
          </form>
        )}
      </Container>
    </section>
  );
}
