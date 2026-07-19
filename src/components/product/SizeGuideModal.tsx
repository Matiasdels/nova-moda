"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

const APPAREL_GUIDE = [
  { size: "XS", chest: "82-86", waist: "62-66", hip: "88-92" },
  { size: "S", chest: "87-91", waist: "67-71", hip: "93-97" },
  { size: "M", chest: "92-96", waist: "72-77", hip: "98-103" },
  { size: "L", chest: "97-102", waist: "78-84", hip: "104-110" },
  { size: "XL", chest: "103-109", waist: "85-92", hip: "111-118" },
];

export function SizeGuideModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Guía de talles"
      className="fixed inset-0 z-[95] flex items-center justify-center bg-brand-black/40 p-4"
    >
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto bg-brand-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-brand-black">Guía de talles</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar guía de talles"
            className="flex h-9 w-9 items-center justify-center focus-ring"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-sm text-brand-muted">Medidas en centímetros, referenciales según el cuerpo.</p>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-brand-border text-left text-xs uppercase tracking-wide text-brand-muted">
              <th className="py-2">Talle</th>
              <th className="py-2">Pecho</th>
              <th className="py-2">Cintura</th>
              <th className="py-2">Cadera</th>
            </tr>
          </thead>
          <tbody>
            {APPAREL_GUIDE.map((row) => (
              <tr key={row.size} className="border-b border-brand-border">
                <td className="py-2.5 font-medium text-brand-black">{row.size}</td>
                <td className="py-2.5 text-brand-muted">{row.chest}</td>
                <td className="py-2.5 text-brand-muted">{row.waist}</td>
                <td className="py-2.5 text-brand-muted">{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-xs text-brand-muted">
          Para calzado, las tallas siguen la numeración estándar de Uruguay. Ante dudas, escribinos y te ayudamos a
          elegir.
        </p>
      </div>
    </div>
  );
}
