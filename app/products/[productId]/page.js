import { notFound } from 'next/navigation';
import { products } from '../../../Database/products';
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

export default function ProductPage({ params }) {
  const singleProduct = products.find((product) => {
    return product.id === parseInt(params.productId);
  });

  if (!singleProduct) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return <Product singleProduct={singleProduct} />;
}
