import { notFound } from 'next/navigation';
import { getProductById } from '../../../database/products';
import { productNotFoundMetadata } from './not-found';
import Product from './Product';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const singleProduct = await getProductById(props.params.productId);

  if (!singleProduct) {
    return productNotFoundMetadata;
  }

  return {
    title: singleProduct.name,
    description: `Product page for ${singleProduct.name}`,
  };
}

export default async function ProductPage({ params }) {
  const singleProduct = await getProductById(params.productId);
  if (!singleProduct) {
    notFound();
  }

  return <Product singleProduct={singleProduct} />;
}
