import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../Database/products';
import styles from './page.module.scss';

export default function productsPage() {
  return (
    <>
      <h1 className={styles.heading}>Bricks!</h1>
      <main className={styles.main}>
        {products.map((product) => {
          return (
            <div className={styles.productCard} key={product.id}>
              <Link href={`/shop/${product.part}`}>
                <h2>{product.name}</h2>
                <p>Part no. {product.part}</p>
                <Image
                  src={`/productImages/${product.image}`}
                  alt={product.type}
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
}
