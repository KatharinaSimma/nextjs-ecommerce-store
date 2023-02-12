'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCartItem } from '../../../utils/cookies';
import styles from './page.module.scss';

export default function ProductPage({ singleProduct }) {
  const router = useRouter();
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
          setCartItem(singleProduct.id, productAmount, 'add');
          router.refresh();
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
