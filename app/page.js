import Image from 'next/image';
import basebrick from '../public/productImages/M3001.webp';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.hero}>
      <h1>Welcome to Brick Base</h1>
      <p>We sell base bricks.</p>
      <Image className={styles.image} src={basebrick} alt="brick" />
    </div>
  );
}
