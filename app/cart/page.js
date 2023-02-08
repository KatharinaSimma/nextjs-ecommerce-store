import { getProducts } from '../../database/products';
import { CartTable } from './CartTable';
import styles from './page.module.scss';

export default async function cartPage() {
  const products = await getProducts();
  return (
    <>
      <h1 className={styles.heading}>Your cart</h1>
      <CartTable products={products} />
    </>
  );
}
