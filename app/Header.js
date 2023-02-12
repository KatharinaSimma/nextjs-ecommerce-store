import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import CartCount from './CartCount';
import styles from './Header.module.scss';

export default function Header() {
  // get the cookie from the server:
  const cart = cookies().get('cartItemCookie');
  let cartItems = [];
  if (cart) {
    cartItems = JSON.parse(cart.value);
  }
  // count the items in the cookie;
  let totalAmountOfCartItems = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalAmountOfCartItems += cartItems[i].amount;
  }

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.navLeft}>
          <Link href="/">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className={styles.logo}
              alt="brickbase logo"
            />
          </Link>
          <Link
            href="/"
            style={{
              marginLeft: '5px',
              marginRight: '10px',
              fontSize: '1.5rem',
            }}
          >
            Brick Base{' '}
          </Link>
          <Link href="/products" data-test-id="products-link">
            Shop
          </Link>
        </div>
        <Link href="/cart" data-test-id="cart-link">
          <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
          (<CartCount cartCount={totalAmountOfCartItems} />)
        </Link>
      </nav>
    </header>
  );
}
