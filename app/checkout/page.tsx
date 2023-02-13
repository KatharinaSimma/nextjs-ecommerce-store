import CartCount from '../CartCount';
import CheckoutForm from './checkoutForm';

export const metadata = {
  title: 'Checkout',
  description:
    'This is the checkout page, add your personal data and review  products in the cart',
};

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <p>Review your products and add your invoice data.</p>
      <h3>Order Details</h3>
      <p>
        Number of Items: <CartCount />
      </p>
      <p>Total Price:</p>
      <hr />
      <CheckoutForm />
    </div>
  );
}
