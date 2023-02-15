import { Product } from '../database/products';
import { CookieValue } from '../utils/cookies';
import { getCartWithProductsData } from './dataStructures';

test('reduce cart cookie with products', () => {
  const cartItemsWithProductData = [
    {
      id: 1,
      name: 'Corner Brick 1x2x2',
      part: 2357,
      image: 'M2357.webp',
      price: 0.22,
      amount: 13,
    },
    {
      id: 2,
      name: 'Corner Plate 1x2x2',
      part: 2420,
      image: 'M2420.webp',
      price: 0.22,
      amount: 0,
    },
    {
      id: 3,
      name: 'Brick 1x16',
      part: 2465,
      image: 'M2465.webp',
      price: 0.25,
      amount: 0,
    },
    {
      id: 4,
      name: 'Brick 2x4',
      part: 3001,
      image: 'M3001.webp',
      price: 0.22,
      amount: 20,
    },
    {
      id: 5,
      name: 'Brick 2x3',
      part: 3002,
      image: 'M3002.webp',
      price: 0.21,
      amount: 0,
    },
  ];

  const cartCookie: CookieValue = [
    { id: 1, amount: 13 },
    { id: 4, amount: 20 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Corner Brick 1x2x2',
      part: 2357,
      image: 'M2357.webp',
      price: 0.22,
    },
    {
      id: 2,
      name: 'Corner Plate 1x2x2',
      part: 2420,
      image: 'M2420.webp',
      price: 0.22,
    },
    {
      id: 3,
      name: 'Brick 1x16',
      part: 2465,
      image: 'M2465.webp',
      price: 0.25,
    },
    {
      id: 4,
      name: 'Brick 2x4',
      part: 3001,
      image: 'M3001.webp',
      price: 0.22,
    },
    {
      id: 5,
      name: 'Brick 2x3',
      part: 3002,
      image: 'M3002.webp',
      price: 0.21,
    },
  ];

  expect(getCartWithProductsData(products, cartCookie)).toStrictEqual(
    cartItemsWithProductData,
  );
});
