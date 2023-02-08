import { notFound } from 'next/navigation';
import { getProductById } from '../../../database/products';
import Product from './Product';

export const dynamic = 'force-dynamic';

// export async function generateMetadata(props) {
//   const singleAnimal = await getAnimalById(props.params.animalId);

//   if (!singleAnimal) {
//     return animalNotFoundMetadata;
//   }

//   return {
//     title: singleAnimal.firstName,
//     description: `Single animal page for ${singleAnimal.firstName}`,
//   };
// }

export default async function ProductPage({ params }) {
  const singleProduct = await getProductById(params.productId);
  console.log('singleProduct', singleProduct);
  if (!singleProduct) {
    notFound();
  }

  return <Product singleProduct={singleProduct} />;
}
