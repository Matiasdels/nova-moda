import { describe, expect, it } from "vitest";
import { calculateDiscountPercentage, formatPrice, isSizeAvailable, slugify } from "@/lib/utils";

describe("formatPrice", () => {
  it("formatea números como pesos uruguayos con separador de miles", () => {
    expect(formatPrice(1990)).toBe("$ 1.990");
    expect(formatPrice(250)).toBe("$ 250");
    expect(formatPrice(0)).toBe("$ 0");
  });
});

describe("calculateDiscountPercentage", () => {
  it("calcula el porcentaje de descuento redondeado", () => {
    expect(calculateDiscountPercentage(990, 1290)).toBe(23);
    expect(calculateDiscountPercentage(2790, 3490)).toBe(20);
  });

  it("devuelve 0 cuando no hay precio anterior o no es mayor", () => {
    expect(calculateDiscountPercentage(1000)).toBe(0);
    expect(calculateDiscountPercentage(1000, 900)).toBe(0);
  });
});

describe("slugify", () => {
  it("convierte texto con acentos y espacios en slugs válidos", () => {
    expect(slugify("Remera Oversize Algodón")).toBe("remera-oversize-algodon");
    expect(slugify("Jean Mom Fit")).toBe("jean-mom-fit");
  });
});

describe("isSizeAvailable", () => {
  it("detecta talles con y sin stock", () => {
    const product = { availableStock: { S: 0, M: 4 } };
    expect(isSizeAvailable(product, "S")).toBe(false);
    expect(isSizeAvailable(product, "M")).toBe(true);
    expect(isSizeAvailable(product, "L")).toBe(false);
  });
});
