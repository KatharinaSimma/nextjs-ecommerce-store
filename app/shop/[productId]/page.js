import Image from 'next/image';
import { products } from '../../../Database/products';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default function ProductPage({ params }) {
  const singleProduct = products.find((product) => {
    return product.part === parseInt(params.productId);
  });

  console.log(singleProduct);
  // if (!singleProduct) {
  //   // throw new Error('this action is not allowed with Error id: 213123123');
  //   notFound();
  // }

  return (
    <div className={styles.singleProductContainer}>
      <h1>{singleProduct.name}</h1>
      <main>
        {singleProduct.name} has the product no {singleProduct.part} and is
        available in a variety of colors
        <br />
        <Image
          src={`/productImages/M${singleProduct.part}.webp`}
          alt={singleProduct.name}
          width="100"
          height="100"
        />
      </main>
    </div>
  );
}
