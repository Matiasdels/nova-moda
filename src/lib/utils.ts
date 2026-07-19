import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/config";
import type { Product } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// NBSP (U+00A0) y espacio angosto (U+202F): Intl.NumberFormat los usa como
// separador entre el símbolo de moneda y el número en algunos locales.
const NON_BREAKING_SPACE_REGEX = new RegExp("[\\u00A0\\u202F]", "g");

/**
 * Formatea un número como precio en pesos uruguayos, ej: $ 1.990
 */
export function formatPrice(value: number): string {
  const raw = new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);

  return raw
    .replace(NON_BREAKING_SPACE_REGEX, " ")
    .replace(/^UYU\s?/, "$ ")
    .replace(/^\$U\s?/, "$ ");
}

export function calculateDiscountPercentage(price: number, previousPrice?: number): number {
  if (!previousPrice || previousPrice <= price) return 0;
  return Math.round(((previousPrice - price) / previousPrice) * 100);
}

export function isProductOnSale(product: Pick<Product, "price" | "previousPrice">): boolean {
  return Boolean(product.previousPrice && product.previousPrice > product.price);
}

export function getTotalStock(product: Pick<Product, "availableStock">): number {
  return Object.values(product.availableStock).reduce((sum, qty) => sum + qty, 0);
}

export function isSizeAvailable(product: Pick<Product, "availableStock">, size: string): boolean {
  return (product.availableStock[size] ?? 0) > 0;
}

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat(siteConfig.locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `NM-${y}${random}`;
}
