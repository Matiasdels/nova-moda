import type { Product, SortOption } from "@/lib/types";
import { isProductOnSale, getTotalStock } from "@/lib/utils";

export type ShopFilters = {
  q: string;
  categories: string[];
  collections: string[];
  sizes: string[];
  colors: string[];
  priceMin: number | null;
  priceMax: number | null;
  onSale: boolean;
  inStock: boolean;
  sort: SortOption;
};

export const DEFAULT_SORT: SortOption = "recomendados";

export const SORT_LABELS: Record<SortOption, string> = {
  recomendados: "Recomendados",
  recientes: "Más recientes",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  descuento: "Mayor descuento",
  "nombre-asc": "Nombre de A a Z",
};

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

export function parseFiltersFromSearchParams(params: URLSearchParams): ShopFilters {
  const priceMinRaw = params.get("precioMin");
  const priceMaxRaw = params.get("precioMax");
  const sort = params.get("orden") as SortOption | null;

  return {
    q: params.get("q") ?? "",
    categories: parseList(params.get("categoria")),
    collections: parseList(params.get("coleccion")),
    sizes: parseList(params.get("talle")),
    colors: parseList(params.get("color")),
    priceMin: priceMinRaw ? Number(priceMinRaw) : null,
    priceMax: priceMaxRaw ? Number(priceMaxRaw) : null,
    onSale: params.get("oferta") === "1",
    inStock: params.get("disponible") === "1",
    sort: sort && sort in SORT_LABELS ? sort : DEFAULT_SORT,
  };
}

export function filtersToSearchParams(filters: ShopFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.categories.length) params.set("categoria", filters.categories.join(","));
  if (filters.collections.length) params.set("coleccion", filters.collections.join(","));
  if (filters.sizes.length) params.set("talle", filters.sizes.join(","));
  if (filters.colors.length) params.set("color", filters.colors.join(","));
  if (filters.priceMin !== null) params.set("precioMin", String(filters.priceMin));
  if (filters.priceMax !== null) params.set("precioMax", String(filters.priceMax));
  if (filters.onSale) params.set("oferta", "1");
  if (filters.inStock) params.set("disponible", "1");
  if (filters.sort !== DEFAULT_SORT) params.set("orden", filters.sort);
  return params;
}

export function applyFilters(products: Product[], filters: ShopFilters): Product[] {
  let result = products;

  if (filters.q.trim()) {
    const normalized = filters.q.trim().toLowerCase();
    result = result.filter((p) =>
      [p.name, p.category, p.shortDescription, p.description, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }

  if (filters.categories.length) {
    result = result.filter((p) => filters.categories.includes(p.categorySlug));
  }

  if (filters.collections.length) {
    result = result.filter((p) => filters.collections.includes(p.collection));
  }

  if (filters.sizes.length) {
    result = result.filter((p) => filters.sizes.some((size) => p.sizes.includes(size)));
  }

  if (filters.colors.length) {
    result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
  }

  if (filters.priceMin !== null) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }

  if (filters.priceMax !== null) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }

  if (filters.onSale) {
    result = result.filter((p) => isProductOnSale(p));
  }

  if (filters.inStock) {
    result = result.filter((p) => getTotalStock(p) > 0);
  }

  return sortProducts(result, filters.sort);
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "recientes":
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "precio-asc":
      return list.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return list.sort((a, b) => b.price - a.price);
    case "descuento":
      return list.sort((a, b) => {
        const discountA = a.previousPrice ? a.previousPrice - a.price : 0;
        const discountB = b.previousPrice ? b.previousPrice - b.price : 0;
        return discountB - discountA;
      });
    case "nombre-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name, "es"));
    case "recomendados":
    default:
      return list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }
}
