import { cookies } from 'next/headers';
import Image from 'next/image';
import { products } from '../../Database/products';
// import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';
import { DecreaseButton } from './CartButtons';
import styles from './page.module.scss';

export default function cartPage() {
  const cartItemsCookie = cookies().get('cartItemCookie');
  // const cartItemsCookie = getParsedCookie('cartItemCookie');

  let cartItemsCookieParsed = [];

  if (cartItemsCookie) {
    cartItemsCookieParsed = JSON.parse(cartItemsCookie.value);
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

  const cart = cartItemsWithProductData.map((product) => {
    if (product.amount > 0) {
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
              Amount {product.amount}
            </span>
            {/* <button
            // onClick={() => {
            //   if (!cartItemsCookie) {
            //     return;
            //   }
            //   const foundItem = cartItemsCookie.find((itemInCart) => {
            //     return itemInCart.id === product.id;
            //   });

            //   if (foundItem) {
            //     foundItem.amount--;
            //     if (foundItem.amount < 0) {
            //       foundItem.amount = 0;
            //     }
            //   }
            // setStringifiedCookie('cartItemCookie', cartItemsCookie);
            // }}
            >
              {' '}
              -1{' '}
            </button> */}
            <DecreaseButton id={product.id} />
          </div>
        </div>
      );
    }
    return null;
  });

  return (
    <>
      <h1 className={styles.heading}>Your cart</h1>

      <main className={styles.main}>
        {cartItemsCookieParsed.length > 0 ? (
          cart
        ) : (
          <div>... is empty. Go shop some bricks!</div>
        )}
        {cartItemsCookieParsed.length > 0 ? (
          <>
            <div data-test-id="cart-total">Cart Total: 500€</div>
            <button data-test-id="cart-checkout">Go to checkout</button>
          </>
        ) : null}
      </main>
    </>
  );
}
