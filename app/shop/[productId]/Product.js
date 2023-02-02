'use client';

import Image from 'next/image';
import { getParsedCookie, setStringifiedCookie } from '../../../utils/cookies';
import styles from './page.module.scss';

export default function ProductPage({ singleProduct }) {
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
        />
      </main>
      <button
        onClick={() => {
          const cartItemsCookie = getParsedCookie('cartItemCookie');
          // there is no cookie at all -> set new cookie
          if (!cartItemsCookie) {
            setStringifiedCookie('cartItemCookie', [
              { id: singleProduct.id, amount: 1 },
            ]);
            return;
          }

          const foundItem = cartItemsCookie.find((itemInCart) => {
            return itemInCart.id === singleProduct.id;
          });

          if (foundItem) {
            foundItem.amount++;
          } else {
            cartItemsCookie.push({ id: singleProduct.id, amount: 1 });
          }
          // Update the cookie after transformation
          setStringifiedCookie('cartItemCookie', cartItemsCookie);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
