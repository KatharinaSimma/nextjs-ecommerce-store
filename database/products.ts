import { cache } from 'react';
import { sql } from './connect';

type Product = {
  id: number;
  name: string;
  part: number;
  image: string;
  price: number;
};

export const getProducts = cache(async () => {
  const products = await sql<Product[]>`
    SELECT * FROM products
  `;
  return products;
});

export const getProductById = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product;
});