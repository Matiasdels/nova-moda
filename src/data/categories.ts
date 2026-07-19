import type { CategoryDefinition } from "@/lib/types";

function categoryImage(label: string, tone: "base" | "alt" = "base"): string {
  const bg = tone === "base" ? "F6F6F6" : "FBE9E7";
  return `https://placehold.co/1200x1500/${bg}/050503?font=montserrat&text=${encodeURIComponent(label)}`;
}

export const categories: CategoryDefinition[] = [
  {
    slug: "mujer",
    name: "Mujer",
    description: "Remeras, vestidos, buzos y más para el día a día.",
    image: categoryImage("Mujer"),
  },
  {
    slug: "hombre",
    name: "Hombre",
    description: "Camisas, camperas y básicos pensados para combinar.",
    image: categoryImage("Hombre", "alt"),
  },
  {
    slug: "unisex",
    name: "Unisex",
    description: "Prendas versátiles sin distinción de género.",
    image: categoryImage("Unisex"),
  },
  {
    slug: "calzado",
    name: "Calzado",
    description: "Zapatillas y botas para cada ocasión.",
    image: categoryImage("Calzado", "alt"),
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    description: "Los detalles que completan tu look.",
    image: categoryImage("Accesorios"),
  },
  {
    slug: "nuevos-ingresos",
    name: "Nuevos ingresos",
    description: "Lo último en llegar a NOVA MODA.",
    image: categoryImage("Nuevos Ingresos", "alt"),
  },
  {
    slug: "ofertas",
    name: "Ofertas",
    description: "Precios especiales por tiempo limitado.",
    image: categoryImage("Ofertas"),
    highlight: true,
  },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return categories.find((c) => c.slug === slug);
}
