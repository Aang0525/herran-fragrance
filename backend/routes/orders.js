import { Router } from "express";
import { db } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// Público: crear pedido (checkout) y descontar stock
router.post("/", (req, res) => {
  const { customer_name, customer_email, customer_phone, customer_address, items } = req.body || {};
  if (!customer_name || !customer_email || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Datos de pedido incompletos" });
  }

  const tx = db.transaction((items) => {
    let total = 0;
    for (const item of items) {
      const product = db.prepare("SELECT * FROM products WHERE id = ?").get(item.id);
      if (!product) throw new Error(`Producto ${item.id} no existe`);
      if (product.stock < item.qty) throw new Error(`Stock insuficiente para ${product.name}`);
      total += product.price * item.qty;
    }
    for (const item of items) {
      db.prepare("UPDATE products SET stock = stock - ? WHERE id = ?").run(item.qty, item.id);
    }
    const result = db.prepare(`INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, items_json, total)
      VALUES (?, ?, ?, ?, ?, ?)`).run(customer_name, customer_email, customer_phone || "", customer_address || "", JSON.stringify(items), total);
    return result.lastInsertRowid;
  });

  try {
    const id = tx(items);
    res.status(201).json({ ok: true, orderId: id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Admin: ver pedidos
router.get("/", requireAdmin, (req, res) => {
  const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all()
    .map(o => ({ ...o, items: JSON.parse(o.items_json) }));
  res.json(orders);
});

router.put("/:id/status", requireAdmin, (req, res) => {
  const { status } = req.body;
  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ ok: true });
});

export default router;
