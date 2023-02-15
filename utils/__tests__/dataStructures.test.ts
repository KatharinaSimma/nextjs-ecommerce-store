import { Product } from '../../database/products';
import { CookieValue } from '../cookies';
import {
  getCartTotal,
  getCartWithProductsData,
  getTotalNumberOfItems,
} from '../dataStructures';

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
const cartItemsWithProductData1 = [
  {
    id: 1,
    name: 'Corner Brick 1x2x2',
    part: 2357,
    image: 'M2357.webp',
    price: 0.22,
    amount: 13,
  },
];
const cartItemsWithProductData2 = [
  {
    id: 2,
    name: 'Corner Plate 1x2x2',
    part: 2420,
    image: 'M2420.webp',
    price: 0.22,
    amount: 47,
  },
  {
    id: 3,
    name: 'Brick 1x16',
    part: 2465,
    image: 'M2465.webp',
    price: 0.25,
    amount: 5628,
  },
  {
    id: 4,
    name: 'Brick 2x4',
    part: 3001,
    image: 'M3001.webp',
    price: 0.22,
    amount: 1547,
  },
];
const cartCookie: CookieValue = [
  { id: 1, amount: 13 },
  { id: 4, amount: 20 },
];
const cartCookie1: CookieValue = [
  { id: 1, amount: 165464 },
  { id: 4, amount: 5000 },
];
const cartCookie2: CookieValue = [
  { id: 1, amount: 18 },
  { id: 4, amount: 38 },
  { id: 5, amount: 28 },
  { id: 2, amount: 16 },
  { id: 3, amount: 14 },
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

test('reduce cart cookie with products', () => {
  expect(getCartWithProductsData(products, cartCookie)).toStrictEqual(
    cartItemsWithProductData,
  );
});

test('count cart total cash', () => {
  expect(getCartTotal(cartItemsWithProductData)).toBe(7.26);
  expect(getCartTotal(cartItemsWithProductData1)).toBe(2.86);
  expect(getCartTotal(cartItemsWithProductData2)).toBe(1757.68);
});

test('total number of items in a cart', () => {
  expect(getTotalNumberOfItems(cartCookie)).toBe(33);
  expect(getTotalNumberOfItems(cartCookie1)).toBe(170464);
  expect(getTotalNumberOfItems(cartCookie2)).toBe(114);
});
