'use client';

import {
  faAngleLeft,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCartItem } from '../../../utils/cookies';
import styles from './Product.module.scss';

export default function ProductPage({ singleProduct }) {
  const router = useRouter();
  const [productAmount, setProductAmount] = useState(1);

  return (
    <div className={styles.singleProductContainer}>
      <nav className={styles.productNav}>
        <Link href="/products">
          <FontAwesomeIcon icon={faAngleLeft} />
          Back to all products
        </Link>
      </nav>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src={`/productImages/M${singleProduct.part}.webp`}
            alt={singleProduct.name}
            width="150"
            height="150"
            data-test-id="product-image"
          />
        </div>
        <div className={styles.textContainer}>
          <h1>{singleProduct.name}</h1>
          {singleProduct.name} has the product no {singleProduct.part} and is
          available in a variety of colors
          <p>
            <span data-test-id="product-price">{singleProduct.price}</span>€
          </p>
          <button
            className="smallNumberButton"
            disabled={productAmount <= 1}
            onClick={() => setProductAmount(productAmount - 1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>
            <span data-test-id="product-quantity">{productAmount}</span>
          </span>
          <button
            className="smallNumberButton"
            aria-label="add one item"
            onClick={() => setProductAmount(productAmount + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="linkButton"
            data-test-id="product-add-to-cart"
            onClick={() => {
              setCartItem(singleProduct.id, productAmount, 'add');
              router.refresh();
            }}
          >
            Add to cart
          </button>
        </div>
      </main>
    </div>
  );
}
