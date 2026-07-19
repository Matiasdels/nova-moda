export type Collection = "mujer" | "hombre" | "unisex";

export type ProductBadge = "Nuevo" | "Oferta" | "Últimas unidades";

export type ProductColor = {
  name: string;
  hex: string;
  /** Imágenes específicas de esta variante de color, en orden. */
  images: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  categorySlug: string;
  collection: Collection;
  price: number;
  previousPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  /** Stock disponible por talle, ej. { "M": 4, "L": 0 } */
  availableStock: Record<string, number>;
  tags: string[];
  badge?: ProductBadge;
  featured?: boolean;
  bestSeller?: boolean;
  createdAt: string;
  composition: string;
  careInstructions: string[];
};

export type CategoryDefinition = {
  slug: string;
  name: string;
  description: string;
  image: string;
  highlight?: boolean;
};

export type CartLine = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  previousPrice?: number;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
};

export type SortOption =
  | "recomendados"
  | "recientes"
  | "precio-asc"
  | "precio-desc"
  | "descuento"
  | "nombre-asc";

export type ToastVariant = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
};

export type CheckoutDeliveryMethod = "domicilio" | "retiro";
export type CheckoutPaymentMethod = "tarjeta" | "transferencia" | "retiro";

export type OrderSummary = {
  orderNumber: string;
  createdAt: string;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  deliveryMethod: CheckoutDeliveryMethod;
  paymentMethod: CheckoutPaymentMethod;
  customerName: string;
  customerEmail: string;
};
