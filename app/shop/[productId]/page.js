import { products } from '../../../Database/products';
import Product from './Product';

export default function ProductPage({ params }) {
  const singleProduct = products.find((product) => {
    return product.part === parseInt(params.productId);
  });

  // if (!singleProduct) {
  //   // throw new Error('this action is not allowed with Error id: 213123123');
  //   notFound();
  // }

  return <Product singleProduct={singleProduct} />;
}
