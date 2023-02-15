const products = [
  {
    name: 'Corner Brick 1x2x2',
    part: 2357,
    image: 'M2357.webp',
    price: 0.22,
  },
  {
    name: 'Corner Plate 1x2x2',
    part: 2420,
    image: 'M2420.webp',
    price: 0.22,
  },
  {
    name: 'Brick 1x16',
    part: 2465,
    image: 'M2465.webp',
    price: 0.25,
  },
  {
    name: 'Brick 2x4',
    part: 3001,
    image: 'M3001.webp',
    price: 0.22,
  },
  {
    name: 'Brick 2x3',
    part: 3002,
    image: 'M3002.webp',
    price: 0.21,
  },
];

export async function up(sql) {
  await sql`
      INSERT INTO products ${sql(products, 'name', 'part', 'image', 'price')}
  `;
}

export async function down(sql) {
  for (const product of products) {
    await sql`
      DELETE FROM
        products
      WHERE
        id = ${product.id}
    `;
  }
}
