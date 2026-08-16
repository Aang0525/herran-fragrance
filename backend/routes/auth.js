import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Faltan credenciales" });

  const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email);
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    // En producción el frontend (Netlify) y el backend (Render/Railway) viven en
    // dominios distintos, así que la cookie debe marcarse "none" (requiere secure)
    // para que el navegador la envíe en las peticiones cross-site. En desarrollo
    // "lax" es suficiente y no requiere HTTPS.
    sameSite: isProd ? "none" : "lax",
    maxAge: 8 * 60 * 60 * 1000,
  });
  res.json({ ok: true, email: admin.email });
});

router.post("/logout", (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", { httpOnly: true, secure: isProd, sameSite: isProd ? "none" : "lax" });
  res.json({ ok: true });
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({ email: req.admin.email });
});

export default router;
