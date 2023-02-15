'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '../../database/products';
import { CookieValue, getParsedCookie, setCartItem } from '../../utils/cookies';
import {
  getCartTotal,
  getCartWithProductsData,
  getTotalNumberOfItems,
} from '../../utils/dataStructures';
import styles from './page.module.scss';

export const metadata = {
  title: 'Cart',
  description: 'This is your Brick Base cart.',
};

type Props = {
  products: Product[];
};

export function CartTable(props: Props) {
  const router = useRouter();
  const [cookieValue, setCookieValue] = useState<CookieValue | undefined>([]);
  let cartNumberOfProducts = 0;

  useEffect(() => {
    const valueOfTheCookie: CookieValue | undefined = getParsedCookie('cart');
    if (getParsedCookie('cart') === undefined) {
      setCookieValue([]);
    }
    setCookieValue(valueOfTheCookie);
  }, []);

  let cartItemsCookieParsed: CookieValue = [];
  if (cookieValue) {
    cartItemsCookieParsed = cookieValue;
  }

  const cartItemsWithProductData = getCartWithProductsData(
    props.products,
    cartItemsCookieParsed,
  );

  const cartTotal: number = getCartTotal(cartItemsWithProductData);

  const totalNumberOfItems = getTotalNumberOfItems(cartItemsCookieParsed);

  return (
    <main className={styles.main}>
      {cartItemsWithProductData.map((product) => {
        if (product.amount > 0) {
          // count the product
          cartNumberOfProducts = cartNumberOfProducts + 1;
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
                data-test-id={`cart-product-minusOne-${product.id}`}
                onClick={() => {
                  if (!cookieValue) {
                    return;
                  }
                  const newCookie = setCartItem(product.id, -1, 'add');
                  setCookieValue(newCookie);
                  router.refresh();
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
                  const newCookie = setCartItem(product.id, 0, 'set');
                  setCookieValue(newCookie);
                  router.refresh();
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
        Cart Total: <span data-test-id="cart-total">{cartTotal}</span> €
      </div>
      <div>for {totalNumberOfItems} Bricks</div>
      <Link href="/checkout">
        <button
          disabled={cartNumberOfProducts === 0}
          data-test-id="cart-checkout"
        >
          Go to checkout
        </button>
      </Link>
    </main>
  );
}
