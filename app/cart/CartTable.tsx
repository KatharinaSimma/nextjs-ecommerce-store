'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '../../database/products';
import {
  CookieValue,
  getParsedCookie,
  setStringifiedCookie,
} from '../../utils/cookies';
import styles from './page.module.scss';

export const metadata = {
  title: 'Cart',
  description: 'This is your Brick Base cart.',
};

type Props = {
  products: Product[];
};

export function CartTable(props: Props) {
  const [cookieValue, setCookieValue] = useState<CookieValue | undefined>([]);
  let cartTotalCash = 0;
  let cartNumberOfProducts = 0;
  let cartTotalNumberOfProducts = 0;

  useEffect(() => {
    const valueOfTheCookie: CookieValue | undefined =
      getParsedCookie('cartItemCookie');
    if (getParsedCookie('cartItemCookie') === undefined) {
      setCookieValue([]);
    }

    setCookieValue(valueOfTheCookie);
  }, []);

  let cartItemsCookieParsed: CookieValue = [];
  if (cookieValue) {
    cartItemsCookieParsed = cookieValue;
  }

  const cartItemsWithProductData = props.products.map((product) => {
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
          cartTotalCash = cartTotalCash + product.amount * product.price;
          // count the product
          cartNumberOfProducts = cartNumberOfProducts + 1;
          // count total number of bricks
          cartTotalNumberOfProducts += product.amount;
          return (
            <div
              className={styles.productCard}
              key={product.id}
              data-test-id={`cart-product-${product.id}`}
            >
              <Image
                src={`/productImages/${product.image}`}
                alt={product.name}
                width="50"
                height="50"
              />
              <span>{product.name}</span>
              <span>Part no. {product.part}</span>
              <span>{product.price}</span>
              <span data-test-id={`cart-product-quantity-${product.id}`}>
                {product.amount}
              </span>
              <button
                onClick={() => {
                  if (!cookieValue) {
                    return;
                  }
                  const newCookie = [...cookieValue];
                  console.log('newCookie', newCookie);

                  const foundItem = newCookie.find((itemInCart) => {
                    return itemInCart.id === product.id;
                  });

                  if (foundItem) {
                    foundItem.amount--;
                    if (foundItem.amount < 0) {
                      foundItem.amount = 0;
                    }
                  }
                  if (!foundItem) {
                    return;
                  }
                  console.log('foundItem', foundItem);
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
                  const newCookie: CookieValue = [...cookieValue];
                  const foundItem = newCookie.find((itemInCart) => {
                    return itemInCart.id === product.id;
                  });

                  if (foundItem) {
                    foundItem.amount = 0;
                  }
                  if (!foundItem) {
                    return;
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
      {cartNumberOfProducts === 0 && (
        <div>
          ... is empty. Go shop some bricks{' '}
          <Link href="/shop">in the shop!</Link>
        </div>
      )}
      <div>
        Cart Total:{' '}
        <span data-test-id="cart-total">{cartTotalCash.toFixed(2)}</span> €
      </div>
      <div>for {cartTotalNumberOfProducts} Bricks</div>
      <button
        disabled={cartNumberOfProducts === 0}
        data-test-id="cart-checkout"
      >
        Go to checkout
      </button>
    </main>
  );
}
