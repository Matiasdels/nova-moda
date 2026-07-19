export const URUGUAY_DEPARTMENTS = [
  "Artigas",
  "Canelones",
  "Cerro Largo",
  "Colonia",
  "Durazno",
  "Flores",
  "Florida",
  "Lavalleja",
  "Maldonado",
  "Montevideo",
  "Paysandú",
  "Río Negro",
  "Rivera",
  "Rocha",
  "Salto",
  "San José",
  "Soriano",
  "Tacuarembó",
  "Treinta y Tres",
];

export const INSTALLMENT_OPTIONS = [
  { value: "1", label: "1 pago" },
  { value: "3", label: "3 cuotas sin recargo" },
  { value: "6", label: "6 cuotas" },
  { value: "12", label: "12 cuotas" },
];

export type CheckoutFormData = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  deliveryMethod: "domicilio" | "retiro";
  departamento: string;
  ciudad: string;
  direccion: string;
  numeroPuerta: string;
  apartamento: string;
  codigoPostal: string;
  notas: string;
  paymentMethod: "tarjeta" | "transferencia" | "retiro";
  nombreTitular: string;
  ultimosDigitos: string;
  cuotas: string;
};

export const INITIAL_CHECKOUT_DATA: CheckoutFormData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  deliveryMethod: "domicilio",
  departamento: "",
  ciudad: "",
  direccion: "",
  numeroPuerta: "",
  apartamento: "",
  codigoPostal: "",
  notas: "",
  paymentMethod: "tarjeta",
  nombreTitular: "",
  ultimosDigitos: "",
  cuotas: "1",
};

export const ORDER_STORAGE_KEY = "nova-moda-last-order";

export type CheckoutErrors = Partial<Record<keyof CheckoutFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckout(data: CheckoutFormData): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (!data.nombre.trim()) errors.nombre = "Ingresá tu nombre.";
  else if (data.nombre.trim().length < 2) errors.nombre = "El nombre es demasiado corto.";

  if (!data.apellido.trim()) errors.apellido = "Ingresá tu apellido.";
  else if (data.apellido.trim().length < 2) errors.apellido = "El apellido es demasiado corto.";

  if (!data.email.trim()) errors.email = "Ingresá tu correo electrónico.";
  else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = "Ingresá un correo electrónico válido.";

  if (!data.telefono.trim()) errors.telefono = "Ingresá tu teléfono.";
  else if (data.telefono.replace(/\D/g, "").length < 8) errors.telefono = "Ingresá un teléfono válido.";

  if (data.deliveryMethod === "domicilio") {
    if (!data.departamento) errors.departamento = "Seleccioná un departamento.";
    if (!data.ciudad.trim()) errors.ciudad = "Ingresá tu ciudad.";
    if (!data.direccion.trim()) errors.direccion = "Ingresá tu dirección.";
    if (!data.numeroPuerta.trim()) errors.numeroPuerta = "Ingresá el número de puerta.";
  }

  if (data.paymentMethod === "tarjeta") {
    if (!data.nombreTitular.trim()) errors.nombreTitular = "Ingresá el nombre del titular.";
    if (!/^\d{4}$/.test(data.ultimosDigitos)) errors.ultimosDigitos = "Ingresá 4 dígitos de demostración.";
  }

  return errors;
}
