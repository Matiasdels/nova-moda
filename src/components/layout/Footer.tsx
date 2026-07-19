import Link from "next/link";
import { Instagram, Facebook, Music2, CreditCard } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { categories } from "@/data/categories";

const HELP_LINKS = [
  { label: "Preguntas frecuentes", href: "/tienda" },
  { label: "Envíos", href: "/tienda" },
  { label: "Cambios y devoluciones", href: "/cambios" },
  { label: "Contacto", href: "/tienda" },
];

const LEGAL_LINKS = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Cambios dentro de los 30 días", href: "/cambios" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-white">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
          <span className="font-display text-2xl font-extrabold">
            <span className="text-brand-black">{siteConfig.shortName}</span>
            <span className="text-brand-red">{siteConfig.accentName}</span>
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-brand-muted">{siteConfig.footer.aboutText}</p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de NOVA MODA"
              className="flex h-9 w-9 items-center justify-center border border-brand-border hover:border-brand-black"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de NOVA MODA"
              className="flex h-9 w-9 items-center justify-center border border-brand-border hover:border-brand-black"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de NOVA MODA"
              className="flex h-9 w-9 items-center justify-center border border-brand-border hover:border-brand-black"
            >
              <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-brand-black">Categorías</h3>
          <ul className="flex flex-col gap-2.5">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/categoria/${cat.slug}`} className="text-sm text-brand-muted hover:text-brand-black">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-brand-black">Ayuda</h3>
          <ul className="flex flex-col gap-2.5">
            {HELP_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-brand-muted hover:text-brand-black">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-brand-black">Contacto</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-muted">
            <li>{siteConfig.contact.address}</li>
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-brand-muted">
            © {year} {siteConfig.name}. Todos los derechos reservados. Sitio de demostración.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-xs text-brand-muted hover:text-brand-black">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-brand-muted">
            <CreditCard className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs">Visa · Mastercard · Transferencia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
