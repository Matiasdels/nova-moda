import { slugify } from "@/lib/utils";
import type { Collection, Product, ProductBadge, ProductColor } from "@/lib/types";

/**
 * Catálogo de datos mock. En una implementación real, esta función y el
 * arreglo `products` serían reemplazados por llamadas a una API, pero la
 * forma de `Product` se mantendría igual para no romper el resto de la app.
 */

const GALLERY_LABELS = ["Frente", "Espalda", "Detalle", "Look completo"];

function placeholderImage(text: string, tone: "base" | "alt"): string {
  const bg = tone === "base" ? "F6F6F6" : "FBE9E7";
  return `https://placehold.co/900x1200/${bg}/050503?font=montserrat&text=${encodeURIComponent(text)}`;
}

function buildGallery(name: string): string[] {
  return GALLERY_LABELS.map((label, index) =>
    placeholderImage(`${name}\n${label}`, index % 2 === 0 ? "base" : "alt"),
  );
}

function buildColors(name: string, colors: { name: string; hex: string }[]): ProductColor[] {
  return colors.map((color) => ({
    name: color.name,
    hex: color.hex,
    images: GALLERY_LABELS.map((label, index) =>
      placeholderImage(`${name}\n${color.name} · ${label}`, index % 2 === 0 ? "base" : "alt"),
    ),
  }));
}

function buildStock(sizes: string[], overrides: Record<string, number> = {}): Record<string, number> {
  const stock: Record<string, number> = {};
  for (const size of sizes) {
    stock[size] = overrides[size] ?? 8;
  }
  return stock;
}

type ProductInput = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  collection: Collection;
  price: number;
  previousPrice?: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  stockOverrides?: Record<string, number>;
  tags: string[];
  badge?: ProductBadge;
  featured?: boolean;
  bestSeller?: boolean;
  createdAt: string;
  composition: string;
  careInstructions: string[];
};

function createProduct(input: ProductInput): Product {
  const slug = slugify(input.name);
  return {
    id: input.id,
    slug,
    name: input.name,
    shortDescription: input.shortDescription,
    description: input.description,
    category: input.category,
    categorySlug: slugify(input.category),
    collection: input.collection,
    price: input.price,
    previousPrice: input.previousPrice,
    images: buildGallery(input.name),
    colors: buildColors(input.name, input.colors),
    sizes: input.sizes,
    availableStock: buildStock(input.sizes, input.stockOverrides),
    tags: input.tags,
    badge: input.badge,
    featured: input.featured,
    bestSeller: input.bestSeller,
    createdAt: input.createdAt,
    composition: input.composition,
    careInstructions: input.careInstructions,
  };
}

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const SHOE_SIZES_W = ["35", "36", "37", "38", "39"];
const SHOE_SIZES_M = ["39", "40", "41", "42", "43", "44"];

const CARE_STANDARD = [
  "Lavar a máquina con agua fría",
  "No usar cloro",
  "Planchar a temperatura media",
  "No lavar en seco",
];

const CARE_DELICATE = [
  "Lavar a mano con agua fría",
  "No retorcer",
  "Secar a la sombra",
  "Planchar a baja temperatura",
];

const CARE_SHOES = [
  "Limpiar con paño húmedo",
  "No sumergir en agua",
  "Guardar en lugar seco",
  "Usar hormas para mantener la forma",
];

const CARE_LEATHER = [
  "Limpiar con paño seco",
  "Evitar exposición prolongada al sol",
  "Usar productos específicos para cuero",
];

export const products: Product[] = [
  createProduct({
    id: "p01",
    name: "Remera Oversize Algodón",
    shortDescription: "Remera de algodón con calce oversize",
    description:
      "Remera de algodón peinado con calce oversize, ideal para looks cómodos y versátiles. Cuello redondo y costuras reforzadas.",
    category: "Remeras",
    collection: "mujer",
    price: 990,
    previousPrice: 1290,
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Negro", hex: "#050503" },
      { name: "Terracota", hex: "#C56A4E" },
    ],
    sizes: APPAREL_SIZES,
    stockOverrides: { XS: 3, XL: 0 },
    tags: ["remera", "algodón", "oversize", "básico"],
    badge: "Oferta",
    featured: true,
    createdAt: "2026-06-20",
    composition: "100% algodón peinado",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p02",
    name: "Remera Básica Cuello Redondo",
    shortDescription: "Remera esencial de algodón",
    description:
      "Remera básica de algodón suave, corte clásico y cuello redondo. Un fundamental para combinar con todo.",
    category: "Remeras",
    collection: "hombre",
    price: 890,
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Gris Melange", hex: "#B7B7B7" },
      { name: "Azul Marino", hex: "#1F2A44" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["remera", "básico", "algodón"],
    bestSeller: true,
    createdAt: "2026-04-02",
    composition: "100% algodón",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p03",
    name: "Remera Estampada Unisex",
    shortDescription: "Remera con estampa gráfica",
    description:
      "Remera unisex de algodón con estampa gráfica exclusiva NOVA MODA. Calce regular y tacto suave.",
    category: "Remeras",
    collection: "unisex",
    price: 1090,
    colors: [
      { name: "Negro", hex: "#050503" },
      { name: "Blanco", hex: "#FFFFFF" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["remera", "estampada", "unisex"],
    badge: "Nuevo",
    createdAt: "2026-07-10",
    composition: "100% algodón",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p04",
    name: "Camisa Lino Manga Larga",
    shortDescription: "Camisa liviana de lino",
    description:
      "Camisa de lino de manga larga, fresca y liviana, perfecta para los días cálidos. Corte regular y botones nacarados.",
    category: "Camisas",
    collection: "hombre",
    price: 2190,
    colors: [
      { name: "Celeste", hex: "#A9C7D8" },
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Beige", hex: "#DCCBB0" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["camisa", "lino", "verano"],
    createdAt: "2026-03-14",
    composition: "100% lino",
    careInstructions: CARE_DELICATE,
  }),
  createProduct({
    id: "p05",
    name: "Camisa Oxford Slim",
    shortDescription: "Camisa Oxford de corte slim",
    description:
      "Camisa Oxford de algodón con corte slim fit. Ideal para looks formales o casuales combinada con jean.",
    category: "Camisas",
    collection: "hombre",
    price: 2390,
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Azul", hex: "#3B5A8A" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["camisa", "oxford", "slim"],
    bestSeller: true,
    createdAt: "2026-02-18",
    composition: "100% algodón Oxford",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p06",
    name: "Camisa Fluida Estampada",
    shortDescription: "Camisa fluida con estampa floral",
    description:
      "Camisa de tejido fluido con estampa floral exclusiva. Ideal para looks livianos y femeninos.",
    category: "Camisas",
    collection: "mujer",
    price: 2290,
    colors: [
      { name: "Estampado Floral", hex: "#DB3931" },
      { name: "Estampado Beige", hex: "#DCCBB0" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["camisa", "estampada", "fluida"],
    badge: "Nuevo",
    createdAt: "2026-07-05",
    composition: "100% viscosa",
    careInstructions: CARE_DELICATE,
  }),
  createProduct({
    id: "p07",
    name: "Buzo Canguro Frisa",
    shortDescription: "Buzo con capucha y bolsillo canguro",
    description:
      "Buzo de frisa con capucha ajustable y bolsillo canguro. Calce relajado, ideal para el día a día.",
    category: "Buzos",
    collection: "unisex",
    price: 1990,
    colors: [
      { name: "Gris Melange", hex: "#B7B7B7" },
      { name: "Negro", hex: "#050503" },
      { name: "Bordo", hex: "#7A2E2A" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["buzo", "canguro", "frisa", "abrigo"],
    bestSeller: true,
    createdAt: "2026-05-01",
    composition: "80% algodón, 20% poliéster",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p08",
    name: "Buzo Cuello Redondo Básico",
    shortDescription: "Buzo liso de algodón",
    description: "Buzo básico de cuello redondo, tejido de algodón afelpado por dentro para mayor abrigo.",
    category: "Buzos",
    collection: "hombre",
    price: 1790,
    colors: [
      { name: "Negro", hex: "#050503" },
      { name: "Gris", hex: "#8C8C8C" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["buzo", "básico"],
    createdAt: "2026-04-22",
    composition: "80% algodón, 20% poliéster",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p09",
    name: "Buzo Oversize Mujer",
    shortDescription: "Buzo oversize de algodón",
    description: "Buzo oversize con mangas caídas y terminaciones acanaladas. Comodidad y estilo en un solo básico.",
    category: "Buzos",
    collection: "mujer",
    price: 1890,
    previousPrice: 2390,
    colors: [
      { name: "Crudo", hex: "#EDE6DA" },
      { name: "Negro", hex: "#050503" },
    ],
    sizes: APPAREL_SIZES,
    stockOverrides: { XS: 1 },
    tags: ["buzo", "oversize"],
    badge: "Oferta",
    createdAt: "2026-05-28",
    composition: "70% algodón, 30% poliéster",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p10",
    name: "Campera Denim Clásica",
    shortDescription: "Campera de jean atemporal",
    description: "Campera de denim de corte clásico, versátil y resistente. Un infaltable para cualquier temporada.",
    category: "Camperas",
    collection: "unisex",
    price: 3490,
    colors: [
      { name: "Azul Clásico", hex: "#4C6E92" },
      { name: "Negro", hex: "#050503" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["campera", "denim", "jean"],
    bestSeller: true,
    createdAt: "2026-03-30",
    composition: "100% algodón denim",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p11",
    name: "Campera Inflable Liviana",
    shortDescription: "Campera acolchada liviana",
    description: "Campera inflable liviana con capucha desmontable, ideal para los días de frío moderado.",
    category: "Camperas",
    collection: "hombre",
    price: 3990,
    colors: [
      { name: "Negro", hex: "#050503" },
      { name: "Verde Oliva", hex: "#5B5F44" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["campera", "inflable", "abrigo"],
    badge: "Nuevo",
    createdAt: "2026-06-30",
    composition: "Exterior 100% poliéster, relleno sintético",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p12",
    name: "Campera Trench Mujer",
    shortDescription: "Trench de gabardina",
    description: "Campera trench de gabardina con cinturón anudado. Un clásico atemporal para looks elegantes.",
    category: "Camperas",
    collection: "mujer",
    price: 4290,
    colors: [
      { name: "Beige", hex: "#DCCBB0" },
      { name: "Negro", hex: "#050503" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["campera", "trench", "gabardina"],
    featured: true,
    createdAt: "2026-04-10",
    composition: "65% algodón, 35% poliéster",
    careInstructions: CARE_DELICATE,
  }),
  createProduct({
    id: "p13",
    name: "Pantalón Cargo Unisex",
    shortDescription: "Pantalón cargo con bolsillos",
    description: "Pantalón cargo de tela resistente con bolsillos laterales funcionales. Calce relajado.",
    category: "Pantalones",
    collection: "unisex",
    price: 2190,
    colors: [
      { name: "Verde Oliva", hex: "#5B5F44" },
      { name: "Negro", hex: "#050503" },
      { name: "Beige", hex: "#DCCBB0" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["pantalón", "cargo"],
    createdAt: "2026-02-05",
    composition: "98% algodón, 2% elastano",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p14",
    name: "Pantalón Chino Slim",
    shortDescription: "Pantalón chino de corte slim",
    description: "Pantalón chino de gabardina elastizada, corte slim y tiro medio. Ideal para looks prolijos.",
    category: "Pantalones",
    collection: "hombre",
    price: 2090,
    colors: [
      { name: "Beige", hex: "#DCCBB0" },
      { name: "Azul Marino", hex: "#1F2A44" },
      { name: "Negro", hex: "#050503" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["pantalón", "chino", "slim"],
    createdAt: "2026-01-20",
    composition: "97% algodón, 3% elastano",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p15",
    name: "Pantalón Palazzo Mujer",
    shortDescription: "Pantalón palazzo fluido",
    description: "Pantalón palazzo de tiro alto y pierna ancha, tejido fluido y liviano. Comodidad y elegancia.",
    category: "Pantalones",
    collection: "mujer",
    price: 2290,
    previousPrice: 2790,
    colors: [
      { name: "Negro", hex: "#050503" },
      { name: "Terracota", hex: "#C56A4E" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["pantalón", "palazzo"],
    badge: "Oferta",
    createdAt: "2026-05-15",
    composition: "100% viscosa",
    careInstructions: CARE_DELICATE,
  }),
  createProduct({
    id: "p16",
    name: "Jean Recto Clásico",
    shortDescription: "Jean de corte recto",
    description: "Jean de denim rígido con corte recto atemporal. Calce medio y cinco bolsillos clásicos.",
    category: "Jeans",
    collection: "hombre",
    price: 2490,
    colors: [{ name: "Azul Medio", hex: "#4C6E92" }],
    sizes: APPAREL_SIZES,
    tags: ["jean", "recto", "denim"],
    createdAt: "2026-01-08",
    composition: "99% algodón, 1% elastano",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p17",
    name: "Jean Mom Fit",
    shortDescription: "Jean de tiro alto mom fit",
    description: "Jean mom fit de tiro alto con pierna ancha ligeramente ahusada. Un clásico renovado.",
    category: "Jeans",
    collection: "mujer",
    price: 2590,
    colors: [
      { name: "Azul Claro", hex: "#9DB6CE" },
      { name: "Azul Oscuro", hex: "#2F4460" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["jean", "mom fit", "denim"],
    bestSeller: true,
    createdAt: "2026-03-02",
    composition: "98% algodón, 2% elastano",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p18",
    name: "Jean Skinny Unisex",
    shortDescription: "Jean skinny elastizado",
    description: "Jean skinny elastizado de calce ajustado. Máxima comodidad sin perder estilo.",
    category: "Jeans",
    collection: "unisex",
    price: 2390,
    colors: [
      { name: "Negro", hex: "#050503" },
      { name: "Azul Medio", hex: "#4C6E92" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["jean", "skinny", "denim"],
    badge: "Nuevo",
    createdAt: "2026-06-12",
    composition: "96% algodón, 4% elastano",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p19",
    name: "Vestido Midi Floral",
    shortDescription: "Vestido midi con estampa floral",
    description: "Vestido midi de tejido liviano con estampa floral y breteles ajustables. Perfecto para el verano.",
    category: "Vestidos",
    collection: "mujer",
    price: 2990,
    colors: [
      { name: "Floral Rojo", hex: "#DB3931" },
      { name: "Floral Beige", hex: "#DCCBB0" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["vestido", "midi", "floral", "verano"],
    badge: "Nuevo",
    featured: true,
    createdAt: "2026-07-01",
    composition: "100% viscosa",
    careInstructions: CARE_DELICATE,
  }),
  createProduct({
    id: "p20",
    name: "Vestido Camisero",
    shortDescription: "Vestido camisero con cinturón",
    description: "Vestido camisero de algodón con cinturón a tono, cierre de botones y mangas remangables.",
    category: "Vestidos",
    collection: "mujer",
    price: 2790,
    previousPrice: 3490,
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Negro", hex: "#050503" },
    ],
    sizes: APPAREL_SIZES,
    tags: ["vestido", "camisero"],
    badge: "Oferta",
    createdAt: "2026-04-18",
    composition: "100% algodón",
    careInstructions: CARE_STANDARD,
  }),
  createProduct({
    id: "p21",
    name: "Zapatilla Urbana Blanca",
    shortDescription: "Zapatilla urbana de cuero ecológico",
    description: "Zapatilla urbana de cuero ecológico con suela de goma antideslizante. Comodidad para todo el día.",
    category: "Calzado",
    collection: "unisex",
    price: 3290,
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Negro", hex: "#050503" },
    ],
    sizes: [...new Set([...SHOE_SIZES_W, ...SHOE_SIZES_M])].sort(),
    tags: ["zapatilla", "calzado", "urbana"],
    bestSeller: true,
    featured: true,
    createdAt: "2026-02-25",
    composition: "Upper de cuero ecológico, suela de goma",
    careInstructions: CARE_SHOES,
  }),
  createProduct({
    id: "p22",
    name: "Zapatilla Running Liviana",
    shortDescription: "Zapatilla deportiva liviana",
    description: "Zapatilla deportiva con entresuela amortiguada y malla transpirable. Ideal para uso diario y running.",
    category: "Calzado",
    collection: "hombre",
    price: 3590,
    colors: [
      { name: "Gris", hex: "#8C8C8C" },
      { name: "Negro", hex: "#050503" },
    ],
    sizes: SHOE_SIZES_M,
    tags: ["zapatilla", "running", "deportiva"],
    createdAt: "2026-03-20",
    composition: "Upper textil transpirable, suela EVA",
    careInstructions: CARE_SHOES,
  }),
  createProduct({
    id: "p23",
    name: "Bota Corta Cuero Ecológico",
    shortDescription: "Bota corta con cordones",
    description: "Bota corta de cuero ecológico con cordones y suela track. Un básico versátil para el invierno.",
    category: "Calzado",
    collection: "mujer",
    price: 3990,
    colors: [{ name: "Negro", hex: "#050503" }, { name: "Marrón", hex: "#6B4A34" }],
    sizes: SHOE_SIZES_W,
    stockOverrides: { "35": 1, "39": 0 },
    tags: ["bota", "calzado", "invierno"],
    badge: "Últimas unidades",
    createdAt: "2026-05-08",
    composition: "Upper de cuero ecológico, suela de goma",
    careInstructions: CARE_SHOES,
  }),
  createProduct({
    id: "p24",
    name: "Mochila Urbana Impermeable",
    shortDescription: "Mochila con compartimento para notebook",
    description: "Mochila urbana impermeable con compartimento acolchado para notebook y bolsillos organizadores.",
    category: "Accesorios",
    collection: "unisex",
    price: 1690,
    colors: [
      { name: "Negro", hex: "#050503" },
      { name: "Gris", hex: "#8C8C8C" },
    ],
    sizes: ["Único"],
    tags: ["mochila", "accesorio", "urbana"],
    badge: "Nuevo",
    createdAt: "2026-06-25",
    composition: "100% poliéster impermeable",
    careInstructions: ["Limpiar con paño húmedo", "No lavar en máquina", "Secar a la sombra"],
  }),
  createProduct({
    id: "p25",
    name: "Cinturón Cuero Reversible",
    shortDescription: "Cinturón reversible negro y marrón",
    description: "Cinturón de cuero ecológico reversible, dos colores en un solo accesorio. Hebilla metálica.",
    category: "Accesorios",
    collection: "hombre",
    price: 990,
    colors: [{ name: "Negro / Marrón", hex: "#050503" }],
    sizes: ["S", "M", "L"],
    tags: ["cinturón", "accesorio", "cuero"],
    createdAt: "2026-03-11",
    composition: "Cuero ecológico y herrajes metálicos",
    careInstructions: CARE_LEATHER,
  }),
  createProduct({
    id: "p26",
    name: "Gorra Bordada NOVA",
    shortDescription: "Gorra de algodón bordada",
    description: "Gorra de algodón con bordado NOVA MODA y cierre trasero ajustable. Visera curva clásica.",
    category: "Accesorios",
    collection: "unisex",
    price: 790,
    previousPrice: 1090,
    colors: [
      { name: "Negro", hex: "#050503" },
      { name: "Blanco", hex: "#FFFFFF" },
    ],
    sizes: ["Único"],
    tags: ["gorra", "accesorio"],
    badge: "Oferta",
    createdAt: "2026-04-28",
    composition: "100% algodón",
    careInstructions: ["Limpiar con paño húmedo", "No lavar en máquina"],
  }),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Filtra por tipo de producto (remeras, camisas, calzado, etc). */
export function getProductsByType(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

/**
 * Filtra productos para las secciones de navegación principal
 * (Mujer, Hombre, Unisex, Calzado, Accesorios, Nuevos ingresos, Ofertas).
 * Mujer/Hombre/Unisex filtran por colección; Calzado/Accesorios filtran por
 * tipo de producto; Nuevos ingresos y Ofertas son colecciones especiales.
 */
export function getProductsForStorefrontCategory(slug: string): Product[] {
  switch (slug) {
    case "mujer":
    case "hombre":
    case "unisex":
      return products.filter((p) => p.collection === slug);
    case "calzado":
    case "accesorios":
      return products.filter((p) => p.categorySlug === slug);
    case "nuevos-ingresos":
      return getNewArrivals(24);
    case "ofertas":
      return getDealsProducts();
    default:
      return [];
  }
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categorySlug === product.categorySlug ||
          p.tags.some((tag) => product.tags.includes(tag))),
    )
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  return products.filter((p) => p.bestSeller).slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getDealsProducts(): Product[] {
  return products.filter((p) => p.previousPrice && p.previousPrice > p.price);
}

export function getProductTypes(): { slug: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const p of products) {
    if (!seen.has(p.categorySlug)) seen.set(p.categorySlug, p.category);
  }
  return Array.from(seen, ([slug, name]) => ({ slug, name }));
}

export function getAvailableColors(): { name: string; hex: string }[] {
  const seen = new Map<string, string>();
  for (const p of products) {
    for (const c of p.colors) {
      if (!seen.has(c.name)) seen.set(c.name, c.hex);
    }
  }
  return Array.from(seen, ([name, hex]) => ({ name, hex }));
}

export function getAvailableSizes(): string[] {
  const sizes = new Set<string>();
  for (const p of products) {
    for (const s of p.sizes) sizes.add(s);
  }
  return Array.from(sizes).sort();
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return products.filter((p) => {
    const haystack = [p.name, p.category, p.shortDescription, p.description, ...p.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
