import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
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
          <Link href="/shop" data-test-id="products-link">
            Shop
          </Link>
        </div>
        <Link href="/cart">
          <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
        </Link>
      </nav>
    </header>
  );
}
