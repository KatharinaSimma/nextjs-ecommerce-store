import { notFound } from 'next/navigation';
import { getProductById } from '../../../database/products';
import { productNotFoundMetadata } from './not-found';
import Product from './Product';

export const dynamic = 'force-dynamic';

type Props = {
  params: { productId: string };
};

export async function generateMetadata(props: Props) {
  const singleProduct = await getProductById(parseInt(props.params.productId));

  if (!singleProduct) {
    return productNotFoundMetadata;
  }

  return {
    title: singleProduct.name,
    description: `Product page for ${singleProduct.name}`,
  };
}

export default async function ProductPage(props: Props) {
  const singleProduct = await getProductById(parseInt(props.params.productId));
  if (!singleProduct) {
    notFound();
  }

  return <Product singleProduct={singleProduct} />;
}
