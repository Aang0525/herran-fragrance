import { Router } from "express";
import { db } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// Público: listar con filtros (nombre, categoría, género, precio min/max, orden)
router.get("/", (req, res) => {
  const { q, category, gender, minPrice, maxPrice, sort } = req.query;
  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (q) { sql += " AND (name LIKE ? OR brand LIKE ? OR description LIKE ?)"; params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  if (category) { sql += " AND category = ?"; params.push(category); }
  if (gender) { sql += " AND gender = ?"; params.push(gender); }
  if (minPrice) { sql += " AND price >= ?"; params.push(Number(minPrice)); }
  if (maxPrice) { sql += " AND price <= ?"; params.push(Number(maxPrice)); }

  // sort=new / bestseller / offers filtran además de ordenar
  if (sort === "new") sql += " AND is_new = 1";
  else if (sort === "bestseller") sql += " AND featured = 1";
  else if (sort === "offers") sql += " AND compare_at_price IS NOT NULL";

  if (sort === "price_asc") sql += " ORDER BY price ASC";
  else if (sort === "price_desc") sql += " ORDER BY price DESC";
  else sql += " ORDER BY created_at DESC";

  const products = db.prepare(sql).all(...params);
  res.json(products);
});

router.get("/featured", (req, res) => {
  res.json(db.prepare("SELECT * FROM products WHERE featured = 1 ORDER BY created_at DESC LIMIT 8").all());
});

router.get("/categories", (req, res) => {
  res.json(db.prepare("SELECT DISTINCT category FROM products").all().map(r => r.category));
});

router.get("/:id", (req, res) => {
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// Admin: CRUD
router.post("/", requireAdmin, (req, res) => {
  const { name, brand, description, price, category, stock, image_url, featured, low_stock_threshold, gender, is_new, compare_at_price } = req.body;
  if (!name || price == null || !category) return res.status(400).json({ error: "Faltan campos requeridos" });

  const result = db.prepare(`INSERT INTO products (name, brand, description, price, category, stock, image_url, featured, low_stock_threshold, gender, is_new, compare_at_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    name, brand || "", description || "", price, category, stock || 0, image_url || "", featured ? 1 : 0, low_stock_threshold || 5,
    gender || "unisex", is_new ? 1 : 0, compare_at_price || null
  );
  res.status(201).json(db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid));
});

router.put("/:id", requireAdmin, (req, res) => {
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Producto no encontrado" });

  const data = { ...existing, ...req.body };
  db.prepare(`UPDATE products SET name=?, brand=?, description=?, price=?, category=?, stock=?, image_url=?, featured=?, low_stock_threshold=?, gender=?, is_new=?, compare_at_price=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`)
    .run(data.name, data.brand, data.description, data.price, data.category, data.stock, data.image_url, data.featured ? 1 : 0, data.low_stock_threshold,
      data.gender || "unisex", data.is_new ? 1 : 0, data.compare_at_price || null, req.params.id);
  res.json(db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id));
});

router.delete("/:id", requireAdmin, (req, res) => {
  const result = db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Producto no encontrado" });
  res.json({ ok: true });
});

router.get("/admin/low-stock", requireAdmin, (req, res) => {
  res.json(db.prepare("SELECT * FROM products WHERE stock <= low_stock_threshold ORDER BY stock ASC").all());
});

export default router;
