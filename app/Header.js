// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getTotalNumberOfItems } from '../utils/dataStructures';
import styles from './Header.module.scss';

export default function Header() {
  const cart = cookies().get('cart');
  let cartItems = [];
  if (cart) {
    cartItems = JSON.parse(cart.value);
  }

  const totalAmountOfCartItems = getTotalNumberOfItems(cartItems);
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
          {/* <FontAwesomeIcon icon={faCartShopping} className={styles.icon} /> */}
          Cart (<span data-test-id="cart-count">{totalAmountOfCartItems}</span>)
        </Link>
      </nav>
    </header>
  );
}
