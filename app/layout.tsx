import './global.scss';
// import CookieBanner from './Cookiebanner/Cookiebanner';
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

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* <CookieBanner /> */}
        <Header />
        {props.children}
        <footer className={styles.footer}>copyright brick base 2023</footer>
      </body>
    </html>
  );
}
