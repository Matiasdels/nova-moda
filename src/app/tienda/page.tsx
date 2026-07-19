import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopContent } from "@/components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Descubrí toda la colección de indumentaria y accesorios de NOVA MODA.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24" />}>
      <ShopContent />
    </Suspense>
  );
}
