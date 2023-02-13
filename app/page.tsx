import Image from 'next/image';
import Link from 'next/link';
import basebrick from '../public/productImages/M3001.webp';
import styles from './page.module.scss';

export const metadata = {
  title: 'Home',
  description: 'Home page of the Brick Base',
};

export default function Home() {
  return (
    <div className={styles.hero}>
      <h1>Welcome to Brick Base</h1>
      <p>We sell base bricks.</p>
      <Image className={styles.image} src={basebrick} alt="a lego brick" />
      <Link href="/products">
        <button className="linkButton">Go to shop</button>
      </Link>
    </div>
  );
}
