import { cookies } from 'next/headers';

export default function CartCount() {
  const cart = cookies().get('cart');
  let cartItems = [];
  if (cart) {
    cartItems = JSON.parse(cart.value);
  }
  // count the items in the cookie;
  let totalAmountOfCartItems = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalAmountOfCartItems += cartItems[i].amount;
  }
  return <span data-test-id="cart-count">{totalAmountOfCartItems}</span>;
}
