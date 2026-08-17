// Siembra manual para desarrollo local (npm run seed). En producción esto
// ocurre automáticamente al arrancar el servidor (ver db.js) porque el disco
// de Render free tier es efímero.
import { db } from "./db.js";
import { products } from "./productsSeedData.js";

const insert = db.prepare(`INSERT INTO products (name, brand, description, price, compare_at_price, category, gender, stock, image_url, featured, is_new)
  VALUES (@name, @brand, @description, @price, @compare_at_price, @category, @gender, @stock, @image_url, @featured, @is_new)`);

const count = db.prepare("SELECT COUNT(*) c FROM products").get().c;
if (count === 0) {
  const tx = db.transaction((rows) => rows.forEach(r => insert.run({ compare_at_price: null, ...r })));
  tx(products);
  console.log(`${products.length} productos insertados.`);
} else {
  console.log("Ya existen productos, no se insertaron duplicados. Borra herran.db si quieres re-sembrar desde cero.");
}
