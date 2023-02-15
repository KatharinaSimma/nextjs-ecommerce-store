import { cookies } from 'next/headers';
import { getProducts } from '../../database/products';
import { CookieValue } from '../../utils/cookies';
import {
  getCartTotal,
  getCartWithProductsData,
  getTotalNumberOfItems,
} from '../../utils/dataStructures';
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

  const cartTotal: number = getCartTotal(cartWithProductsData);
  const totalAmountOfCartItems = getTotalNumberOfItems(cartCookieParsed);

  return (
    <div>
      <h1>Checkout</h1>
      <p>Review your products and add your invoice data.</p>
      <h3>Order Details</h3>
      <p>Number of Items: {totalAmountOfCartItems}</p>
      <p>Total Price: {cartTotal}€</p>
      <hr />
      <CheckoutForm />
    </div>
  );
}
