import { describe, expect, it } from "vitest";
import { INITIAL_CHECKOUT_DATA, validateCheckout } from "@/lib/checkout";

describe("validateCheckout", () => {
  it("exige nombre, apellido, correo y teléfono", () => {
    const errors = validateCheckout(INITIAL_CHECKOUT_DATA);
    expect(errors.nombre).toBeDefined();
    expect(errors.apellido).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.telefono).toBeDefined();
  });

  it("valida el formato del correo electrónico", () => {
    const errors = validateCheckout({ ...INITIAL_CHECKOUT_DATA, email: "correo-invalido" });
    expect(errors.email).toBeDefined();
  });

  it("exige dirección completa cuando la entrega es a domicilio", () => {
    const errors = validateCheckout({
      ...INITIAL_CHECKOUT_DATA,
      nombre: "Ana",
      apellido: "Pérez",
      email: "ana@example.com",
      telefono: "099123456",
      deliveryMethod: "domicilio",
    });
    expect(errors.departamento).toBeDefined();
    expect(errors.ciudad).toBeDefined();
    expect(errors.direccion).toBeDefined();
    expect(errors.numeroPuerta).toBeDefined();
  });

  it("no exige datos de dirección cuando la entrega es retiro en tienda", () => {
    const errors = validateCheckout({
      ...INITIAL_CHECKOUT_DATA,
      nombre: "Ana",
      apellido: "Pérez",
      email: "ana@example.com",
      telefono: "099123456",
      deliveryMethod: "retiro",
      paymentMethod: "retiro",
    });
    expect(errors.departamento).toBeUndefined();
    expect(errors.direccion).toBeUndefined();
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("exige datos de tarjeta demo cuando el pago es con tarjeta", () => {
    const errors = validateCheckout({
      ...INITIAL_CHECKOUT_DATA,
      nombre: "Ana",
      apellido: "Pérez",
      email: "ana@example.com",
      telefono: "099123456",
      deliveryMethod: "retiro",
      paymentMethod: "tarjeta",
    });
    expect(errors.nombreTitular).toBeDefined();
    expect(errors.ultimosDigitos).toBeDefined();
  });
});
