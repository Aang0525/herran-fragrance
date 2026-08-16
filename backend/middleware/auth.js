import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  const token = req.cookies?.token || (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No autenticado" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") throw new Error("no admin");
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Sesión inválida o expirada" });
  }
}
