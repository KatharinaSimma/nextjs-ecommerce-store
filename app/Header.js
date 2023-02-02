import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <div>
          <Link href="/">Brick Base</Link>
          <Link href="/shop" data-test-id="products-link">
            Shop
          </Link>

          <Link href="/cart">cart</Link>
        </div>
      </nav>
    </header>
  );
}
