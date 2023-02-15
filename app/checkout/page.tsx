import { cookies } from 'next/headers';
import { getProducts } from '../../database/products';
import { CookieValue } from '../../utils/cookies';
import { getCartWithProductsData } from '../../utils/dataStructures';
import CartCount from '../CartCount';
import CheckoutForm from './checkoutForm';

export const metadata = {
  title: 'Checkout',
  description:
    'This is the checkout page, add your personal data and review  products in the cart',
};

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const products = await getProducts();
  const cartCookie = cookies().get('cart');

  let cartCookieParsed: CookieValue = [];
  if (cartCookie) {
    cartCookieParsed = JSON.parse(cartCookie.value);
  }

  const cartWithProductsData = getCartWithProductsData(
    products,
    cartCookieParsed,
  );

  const sumOfAllItems: number = cartWithProductsData.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.amount;
    },
    0,
  );

  return (
    <div>
      <h1>Checkout</h1>
      <p>Review your products and add your invoice data.</p>
      <h3>Order Details</h3>
      <p>
        Number of Items: <CartCount />
      </p>
      <p>Total Price: {sumOfAllItems.toFixed(2)}€</p>
      <hr />
      <CheckoutForm />
    </div>
  );
}
