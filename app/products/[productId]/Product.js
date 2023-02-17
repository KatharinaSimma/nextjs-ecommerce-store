'use client';

// import {
//   faAngleLeft,
//   faMinus,
//   faPlus,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <span>
            <div className={styles.iconBox}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  height="50"
                  width="50"
                  d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"
                />
              </svg>
            </div>
            Back to all products
          </span>
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
          <span>
            Basic brick. Soon available in more than one color. #
            {singleProduct.part} <br />
            (Official Part No.)
          </span>
          <p>
            <span data-test-id="product-price">{singleProduct.price}</span>€
          </p>

          <div className={styles.productCountBlock}>
            {/* <button
              className="smallNumberButton"
              disabled={productAmount <= 1}
              onClick={() => setProductAmount(productAmount - 1)}
            >
              <div className="iconBox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"
                  />
                </svg>
              </div>
            </button> */}

            <input
              type="number"
              data-test-id="product-quantity"
              className={styles.productAmount}
              value={productAmount}
              min={0}
              max={100}
              onChange={(event) =>
                setProductAmount(Number(event.currentTarget.value))
              }
            />

            {/* <button
              className="smallNumberButton"
              aria-label="add one item"
              onClick={() => setProductAmount(productAmount + 1)}
            >
              <div className="iconBox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
                  />
                </svg>
              </div>
            </button> */}
          </div>
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
