import { CartTable } from './CartTable';
import styles from './page.module.scss';

export default function cartPage() {
  return (
    <>
      <h1 className={styles.heading}>Your cart</h1>
      <CartTable />
    </>
  );
}
