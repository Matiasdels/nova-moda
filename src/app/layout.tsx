import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchModal } from "@/components/layout/SearchModal";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { StoreHydration } from "@/components/StoreHydration";

// Fuente auto-hospedada con next/font/local: no depende de red externa en
// build ni en runtime (útil en entornos con acceso a internet restringido).
const manrope = localFont({
  src: [
    { path: "./fonts/manrope/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/manrope/manrope-latin-ext-wght-normal.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-UY" className={manrope.variable}>
      <body className="flex min-h-screen flex-col bg-brand-white font-sans text-brand-black">
        <StoreHydration />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-brand-black focus:px-4 focus:py-2 focus:text-brand-white"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileMenu />
        <SearchModal />
        <CartDrawer />
        <ToastViewport />
      </body>
    </html>
  );
}
