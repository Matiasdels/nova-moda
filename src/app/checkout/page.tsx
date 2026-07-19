import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mb-8 border-b border-brand-border pb-6">
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">Checkout</h1>
          <p className="mt-2 text-sm text-brand-muted">Completá tus datos para finalizar la compra.</p>
        </div>
        <CheckoutForm />
      </Container>
    </div>
  );
}
