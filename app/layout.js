import './global.scss';
import CookieBanner from './Cookiebanner/Cookiebanner';
import Header from './Header';
import styles from './layout.module.scss';

export const metadata = {
  title: {
    default: 'Brick Base',
    template: '%s | Brick Base',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <CookieBanner />
        <Header />

        {children}
        <footer className={styles.footer}>copyright brick base 2023</footer>
      </body>
    </html>
  );
}
