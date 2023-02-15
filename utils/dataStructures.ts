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
  return cartItemsWithProductData;
}

export function getCartTotal(cartWithProductsData: CartWithProductData[]) {
  const sumOfAllItems: number = cartWithProductsData.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.amount;
    },
    0,
  );
  return Number(sumOfAllItems.toFixed(2));
}

export function getTotalNumberOfItems(cartCookieParsed: CookieValue) {
  const totalAmountOfCartItems: number = cartCookieParsed.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    },
    0,
  );
  return totalAmountOfCartItems;
}
