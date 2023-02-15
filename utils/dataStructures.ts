import { Product } from '../database/products';
import { CookieValue } from '../utils/cookies';

export type CartWithProductData = {
  id: number;
  name: string;
  part: number;
  image: string;
  price: number;
  amount: number;
};

export function getCartWithProductsData(
  products: Product[],
  cartCookieParsed: CookieValue,
) {
  console.log('products', products);
  console.log('cart', cartCookieParsed);
  const cartItemsWithProductData = products.map((product) => {
    const fullCartItem = { ...product, amount: 0 };

    const cartItem = cartCookieParsed.find(
      (cookieItem) => product.id === cookieItem.id,
    );

    if (cartItem) {
      fullCartItem.amount = cartItem.amount;
    }

    return fullCartItem;
  });
  console.log('cartItemsWithProductData', cartItemsWithProductData);
  return cartItemsWithProductData;
}
