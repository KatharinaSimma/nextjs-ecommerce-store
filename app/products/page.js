import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import styles from './page.module.scss';

export const metadata = {
  title: 'Shop',
  description: 'This is the product page where you find all the bricks we sell',
};

export const dynamic = 'force-dynamic';

export default async function productsPage() {
  const products = await getProducts();
  return (
    <>
      <h1 className={styles.heading}>Bricks!</h1>
      <main className={styles.main}>
        {products.map((product) => {
          return (
            <Link
              data-test-id={`product-${product.id}`}
              href={`/products/${product.id}`}
              key={product.id}
            >
              <div className={styles.productCard}>
                <h2>{product.name}</h2>
                <p>Part no. {product.part}</p>
                <button className="linkButton">Details</button>
                <Image
                  src={`/productImages/${product.image}`}
                  alt={product.name}
                  width="150"
                  height="150"
                />
              </div>
            </Link>
          );
        })}
      </main>
    </>
  );
}
