import './global.scss';
import Link from 'next/link';
import styles from './layout.module.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header className={styles.header}>
          <nav>
            <div>
              <Link href="/">Brick Base</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/cart">Cart</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>copyright brick base 2023</footer>
      </body>
    </html>
  );
}
