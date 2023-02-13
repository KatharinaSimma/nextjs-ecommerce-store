export async function up(sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(100) NOT NULL,
      part smallint NOT NULL,
      image varchar(100) NOT NULL,
      price numeric(8, 2) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE products
  `;
}
