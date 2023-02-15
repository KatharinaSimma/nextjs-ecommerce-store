import Cookies from 'js-cookie';

export type CookieValue = {
  id: number;
  amount: number;
}[];

// general action: get cookies
export function getParsedCookie(key: string): CookieValue | undefined {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    return undefined;
  }
}

// general action: set cookies
export function setStringifiedCookie(key: string, value: CookieValue) {
  Cookies.set(key, JSON.stringify(value), { expires: 365 });
}

// general action: delete cookie
export function deleteCookie(key: string) {
  Cookies.remove(key);
}

// general action stringify cookie value
export function stringifyCookieValue(value: CookieValue) {
  return JSON.stringify(value);
}

// specific action: add items in the cart, mode: 'add' | 'set' (amount)
export function setCartItem(
  id: number,
  amount: number,
  mode: string,
): CookieValue {
  const cartItemsCookie = getParsedCookie('cart');
  // if there is no cookie at all -> set new cookie
  if (!cartItemsCookie) {
    const amountToBeSet = amount > 0 ? amount : 0;
    setStringifiedCookie('cart', [{ id: id, amount: amountToBeSet }]);
    return [{ id: id, amount: amount }];
  }
  // find the right item in the cookie
  const foundItem = cartItemsCookie.find((itemInCart) => {
    return itemInCart.id === id;
  });
  // add pos or neg values
  if (foundItem && mode === 'add') {
    foundItem.amount += amount;
    if (foundItem.amount < 0) {
      foundItem.amount = 0;
    }
    // set a specific value
  } else if (foundItem && mode === 'set') {
    const actualAmount = amount > 0 ? amount : 0;
    foundItem.amount = actualAmount;
    // if this item is not in the cookie set a new item
  } else if (!foundItem && amount > 0) {
    cartItemsCookie.push({
      id: id,
      amount: amount,
    });
  } else {
    cartItemsCookie.push({
      id: id,
      amount: 0,
    });
  }
  // update the cookie after transformation
  setStringifiedCookie('cart', cartItemsCookie);
  return cartItemsCookie;
}
