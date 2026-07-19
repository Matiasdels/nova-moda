import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-display text-2xl font-extrabold tracking-tight focus-ring",
        className,
      )}
      aria-label={`${siteConfig.name} — Ir al inicio`}
    >
      <span className="text-brand-black">{siteConfig.shortName}</span>
      <span className="text-brand-red">{siteConfig.accentName}</span>
    </Link>
  );
}
