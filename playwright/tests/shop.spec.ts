import { expect, test } from '@playwright/test';

test('Add to cart, change quantity and remove from cart', async ({ page }) => {
  // go to website
  await page.goto('http://localhost:3000/');
  await expect(
    page.getByRole('heading', { name: 'Welcome to Brick Base' }),
  ).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Welcome to Brick Base');

  // go to products page
  await page.getByRole('button', { name: 'Go to shop' }).click();
  await expect(page).toHaveURL('http://localhost:3000/products');
  await expect(page.getByRole('heading', { name: 'Bricks!' })).toBeVisible();
  await expect(page.locator('[data-test-id^="product-"]')).toHaveCount(5);

  // choose first product
  await expect(page.getByTestId('product-1')).toBeVisible();
  await page.getByTestId('product-1').click();
  await expect(page).toHaveURL('http://localhost:3000/products/1');

  // add some products to the cart
  await expect(
    page.getByRole('button', { name: 'add one item' }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'add one item' })
    .click({ clickCount: 3 });
  await expect(page.getByTestId('product-add-to-cart')).toBeVisible();
  await page.getByTestId('product-add-to-cart').click();

  // check if product counts updates in header
  await expect(page.getByTestId('cart-count')).toBeVisible();
  await expect(page.getByTestId('cart-count')).toHaveText('4');

  // go back to all products
  await page.getByRole('link', { name: 'Back to all products' }).click();
  await expect(page).toHaveURL('http://localhost:3000/products');
  await expect(page.getByRole('heading', { name: 'Bricks!' })).toBeVisible();
  await expect(page.locator('[data-test-id^="product-"]')).toHaveCount(5);

  // choose second product
  await expect(page.getByTestId('product-2')).toBeVisible();
  await page.getByTestId('product-2').click();
  await expect(page).toHaveURL('http://localhost:3000/products/2');

  // add some products to the cart
  await expect(
    page.getByRole('button', { name: 'add one item' }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'add one item' })
    .click({ clickCount: 7 });
  await expect(page.getByTestId('product-add-to-cart')).toBeVisible();
  await page.getByTestId('product-add-to-cart').click();

  // check if product counts updates in header
  await expect(page.getByTestId('cart-count')).toBeVisible();
  await expect(page.getByTestId('cart-count')).toHaveText('12');

  // go to cart
  await expect(page.getByTestId('cart-link')).toBeVisible();
  await page.getByTestId('cart-link').click();
  await expect(page).toHaveURL('http://localhost:3000/cart');

  // reduce amount by one
  await expect(page.getByRole('button', { name: '-1' })).toHaveCount(2);
  await expect(page.locator('[data-test-id^="minusOne-"]')).toHaveCount(2);
  await page.getByTestId('minusOne-1').click({ clickCount: 2 });

  // check if product counts updates in header
  await expect(page.getByTestId('cart-count')).toBeVisible();
  await expect(page.getByTestId('cart-count')).toHaveText('10');

  // remove product
  await expect(page.getByTestId('cart-product-remove-1')).toBeVisible();
  await page.getByTestId('cart-product-remove-1').click();

  // check if product counts updates in header
  await expect(page.getByTestId('cart-count')).toBeVisible();
  await expect(page.getByTestId('cart-count')).toHaveText('8');

  // go to checkout
  await expect(page.getByTestId('cart-checkout')).toBeVisible();
  await page.getByTestId('cart-checkout').click();
  await expect(page).toHaveURL('http://localhost:3000/checkout');
});
