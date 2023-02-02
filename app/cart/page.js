import Image from 'next/image';
import { products } from '../../Database/products';
import styles from './page.module.scss';

export default function productsPage() {
  return (
    <>
      <h1 className={styles.heading}>Your cart</h1>
      <main className={styles.main}>
        {products.map((product) => {
          return (
            <div
              className={styles.productCard}
              key={product.id}
              data-test-id={`cart-product-${product.id}`}
            >
              <div
                data-test-id={`product-${product.id}`}
                href={`/shop/${product.part}`}
                className={styles.productItem}
              >
                <Image
                  src={`/productImages/${product.image}`}
                  alt={product.name}
                  width="50"
                  height="50"
                />
                <span>{product.name}</span>
                <span>Part no. {product.part}</span>
                <span>0.22€</span>
                <span data-test-id={`cart-product-quantity-${product.id}`}>
                  1
                </span>
                <button data-test-id={`cart-product-remove-${product.id}`}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <div data-test-id="cart-total">Cart Total: 500€</div>
        <button data-test-id="cart-checkout">Go to checkout</button>
      </main>
    </>
  );
}
