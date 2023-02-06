'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { products } from '../../Database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';
import styles from './page.module.scss';

export function CartTable() {
  const [cookieValue, setCookieValue] = useState(false);
  let cartTotal = 0;
  let cartNumberOfItems = 0;

  useEffect(() => {
    const valueOfTheCookie = getParsedCookie('cartItemCookie');
    const state = valueOfTheCookie === undefined ? false : valueOfTheCookie;
    setCookieValue(state);
  }, []);

  let cartItemsCookieParsed = [];

  if (cookieValue) {
    cartItemsCookieParsed = cookieValue;
  }

  const cartItemsWithProductData = products.map((product) => {
    const fullCartItem = { ...product, amount: 0 };

    const cartItem = cartItemsCookieParsed.find(
      (cookieItem) => product.id === cookieItem.id,
    );
    if (cartItem) {
      fullCartItem.amount = cartItem.amount;
    }

    return fullCartItem;
  });

  return (
    <main className={styles.main}>
      {cartItemsWithProductData.map((product) => {
        if (product.amount > 0) {
          // add to cart total
          cartTotal = cartTotal + product.amount * product.price;
          // count the product
          cartNumberOfItems = cartNumberOfItems + 1;
          return (
            <div
              className={styles.productCard}
              key={product.id}
              data-test-id={`cart-product-${product.id}`}
            >
              {/* <Image
                src={`/productImages/${product.image}`}
                alt={product.name}
                width="50"
                height="50"
              /> */}
              <span>{product.name}</span>
              <span>Part no. {product.part}</span>
              <span>{product.price.toFixed(2)}</span>
              <span data-test-id={`cart-product-quantity-${product.id}`}>
                {product.amount}
              </span>
              <button
                onClick={() => {
                  if (!cookieValue) {
                    return;
                  }
                  const newCookie = [...cookieValue];
                  const foundItem = newCookie.find((itemInCart) => {
                    return itemInCart.id === product.id;
                  });

                  if (foundItem) {
                    foundItem.amount--;
                    if (foundItem.amount < 0) {
                      foundItem.amount = 0;
                    }
                  }
                  setCookieValue(newCookie);
                  setStringifiedCookie('cartItemCookie', newCookie);
                }}
              >
                -1
              </button>
              <button
                data-test-id={`cart-product-remove-${product.id}`}
                onClick={() => {
                  if (!cookieValue) {
                    return;
                  }
                  const newCookie = [...cookieValue];
                  const foundItem = newCookie.find((itemInCart) => {
                    return itemInCart.id === product.id;
                  });

                  if (foundItem) {
                    foundItem.amount = 0;
                  }
                  setCookieValue(newCookie);
                  setStringifiedCookie('cartItemCookie', newCookie);
                }}
              >
                Remove
              </button>
            </div>
          );
        }
        return null;
      })}
      {cartNumberOfItems === 0 && (
        <div>
          ... is empty. Go shop some bricks{' '}
          <Link href="/shop">in the shop!</Link>
        </div>
      )}
      <div>
        Cart Total:{' '}
        <span data-test-id="cart-total">{cartTotal.toFixed(2)}</span> €
      </div>
      <button disabled={cartNumberOfItems === 0} data-test-id="cart-checkout">
        Go to checkout
      </button>
    </main>
  );
}
