/**
 * Configuración central de marca — NOVA MODA.
 *
 * Este archivo centraliza nombre, colores, textos generales, datos de
 * contacto ficticios y enlaces de redes sociales. Modificar únicamente
 * este archivo permite adaptar la plantilla a cualquier comercio de ropa
 * sin tocar el resto del código.
 */

export const siteConfig = {
  name: "NOVA MODA",
  shortName: "NOVA",
  accentName: "MODA",
  tagline: "Tu estilo, todos los días",
  description:
    "Prendas versátiles para crear combinaciones que se adaptan a vos.",
  url: "https://nova-moda.example.com",

  locale: "es-UY",
  currency: "UYU",
  country: "Uruguay",

  contact: {
    email: "hola@novamoda.example.com",
    phone: "+598 2900 0000",
    whatsapp: "+598 99 000 000",
    address: "Av. Ficticia 1234, Montevideo, Uruguay",
    hours: "Lunes a sábados de 10:00 a 20:00",
  },

  social: {
    instagram: "https://instagram.com/novamoda.uy",
    facebook: "https://facebook.com/novamoda.uy",
    tiktok: "https://tiktok.com/@novamoda.uy",
  },

  shipping: {
    freeShippingThreshold: 4000,
    standardShippingCost: 250,
    message: "Envíos a todo Uruguay",
    changesWindowDays: 30,
    pickupMessage: "Retiro en tienda sin costo",
  },

  coupon: {
    code: "NOVA10",
    discountPercentage: 10,
  },

  announcementBar: [
    "Envíos a todo Uruguay",
    "Cambios dentro de los 30 días",
    "Retiro en tienda sin costo",
  ],

  colors: {
    red: "#DB3931",
    redDark: "#B92F2A",
    redSoft: "#FBE9E7",
    black: "#050503",
    white: "#FFFFFF",
    gray: "#F6F6F6",
    border: "#E5E5E5",
    muted: "#666666",
  },

  paymentMethods: ["Tarjeta de crédito", "Tarjeta de débito", "Transferencia bancaria", "Pago al retirar"],

  footer: {
    aboutText:
      "NOVA MODA es una tienda de indumentaria pensada para acompañar tu día a día con prendas simples, versátiles y de buena calidad.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
