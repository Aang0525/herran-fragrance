import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import "./db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Admite una o varias URLs separadas por coma en FRONTEND_URL (útil si tienes
// dominio con y sin "www", o entornos de preview de Netlify/Vercel).
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("No permitido por CORS"));
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: "Demasiados intentos, intenta más tarde" } });
app.use("/api/auth/login", authLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Herran Fragrance API en puerto ${PORT}`));
