import "dotenv/config";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const db = new Database(path.join(__dirname, "herran.db"));
db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  brand TEXT,
  description TEXT,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  featured INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  items_json TEXT NOT NULL,
  total REAL NOT NULL,
  status TEXT DEFAULT 'pendiente',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

// Migraciones ligeras: agrega columnas nuevas a bases de datos existentes sin
// borrar datos. SQLite no soporta "ADD COLUMN IF NOT EXISTS" en todas las
// versiones empaquetadas, así que ignoramos el error si la columna ya existe.
function addColumnIfMissing(table, columnDef) {
  const columnName = columnDef.split(" ")[0];
  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${columnDef}`);
  } catch (err) {
    if (!/duplicate column name/i.test(err.message)) throw err;
  }
}
addColumnIfMissing("products", "gender TEXT DEFAULT 'unisex'");
addColumnIfMissing("products", "is_new INTEGER DEFAULT 0");
addColumnIfMissing("products", "compare_at_price REAL");

// Seed admin from .env if no admin exists yet
const adminEmail = process.env.ADMIN_EMAIL || "admin@herranfragrance.com";
const adminPass = process.env.ADMIN_PASSWORD || "CambiaEstaClave123!";
const existing = db.prepare("SELECT id FROM admins WHERE email = ?").get(adminEmail);
if (!existing) {
  const hash = bcrypt.hashSync(adminPass, 12);
  db.prepare("INSERT INTO admins (email, password_hash) VALUES (?, ?)").run(adminEmail, hash);
  console.log(`Admin creado: ${adminEmail}`);
}
