'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../../utils/cookies';
import styles from './page.module.scss';

export default function ProductPage({ singleProduct }) {
  const [productAmount, setProductAmount] = useState(1);

  return (
    <div className={styles.singleProductContainer}>
      <h1>{singleProduct.name}</h1>
      <main>
        {singleProduct.name} has the product no {singleProduct.part} and is
        available in a variety of colors
        <br />
        <Image
          src={`/productImages/M${singleProduct.part}.webp`}
          alt={singleProduct.name}
          width="100"
          height="100"
          data-test-id="product-image"
        />
        <p>
          Price/piece:{' '}
          <span data-test-id="product-price">{singleProduct.price}</span>€
        </p>
        <button
          disabled={productAmount <= 1}
          onClick={() => setProductAmount(productAmount - 1)}
        >
          -1
        </button>
        <span>
          Quantity: <span data-test-id="product-quantity">{productAmount}</span>
        </span>
        <button onClick={() => setProductAmount(productAmount + 1)}>+1</button>
      </main>
      <button
        data-test-id="product-add-to-cart"
        onClick={() => {
          const cartItemsCookie = getParsedCookie('cart');
          // if there is no cookie at all -> set new cookie
          if (!cartItemsCookie) {
            setStringifiedCookie('cart', [
              { id: singleProduct.id, amount: productAmount },
            ]);
            return;
          }
          // find the right item in the cookie
          const foundItem = cartItemsCookie.find((itemInCart) => {
            return itemInCart.id === singleProduct.id;
          });

          if (foundItem) {
            foundItem.amount += productAmount;
          } else {
            cartItemsCookie.push({
              id: singleProduct.id,
              amount: productAmount,
            });
          }
          // update the cookie after transformation
          setStringifiedCookie('cart', cartItemsCookie);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
