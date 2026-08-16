# Herran Fragrance — Tienda Virtual Fullstack

Tienda de perfumes con panel de administrador privado. Backend en Node/Express + SQLite, frontend en React + Vite.

## Estructura
```
backend/    API REST (Express, better-sqlite3, JWT, bcrypt)
frontend/   React + Vite (tienda pública + panel admin)
```

## 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # edita ADMIN_EMAIL, ADMIN_PASSWORD y JWT_SECRET
npm run seed            # carga 6 productos de ejemplo
npm run dev              # http://localhost:4000
```

**IMPORTANTE — antes de producción:**
- Cambia `JWT_SECRET` por una cadena larga y aleatoria (ej: `openssl rand -hex 32`).
- Cambia `ADMIN_EMAIL` y `ADMIN_PASSWORD` en `.env` **antes** de correr el servidor por primera vez (el admin se crea automáticamente con esos valores).
- Nunca subas `.env` ni `herran.db` a un repositorio público (ya están en `.gitignore`).

## 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # ajusta VITE_API_URL si el backend no está en localhost:4000
npm run dev              # http://localhost:5173
```

## 3. Acceso al panel admin
Ve a `http://localhost:5173/admin/login` e inicia sesión con el correo/contraseña definidos en `backend/.env`. Los usuarios normales de la tienda nunca ven este enlace ni tienen forma de acceder al inventario o pedidos (rutas protegidas con JWT httpOnly + validación de rol en cada endpoint).

## Seguridad implementada
- Contraseña del admin con hash bcrypt (nunca en texto plano).
- Sesión vía JWT en cookie `httpOnly` + `sameSite`, no accesible por JavaScript del navegador.
- Middleware `requireAdmin` en todos los endpoints de escritura (productos, pedidos, subida de imágenes).
- Rate limiting en el endpoint de login para mitigar fuerza bruta.
- Validaciones de datos en backend antes de tocar la base de datos.
- Todas las claves y credenciales sensibles en variables de entorno (`.env`), nunca hardcodeadas.
- CORS restringido al dominio del frontend.

## Producción
- Backend: despliega en cualquier host Node (Render, Railway, VPS). Sirve `/uploads` desde disco persistente o migra a S3/Cloudinary si necesitas escalar imágenes.
- Frontend: `npm run build` genera `dist/`, listo para Netlify/Vercel. Configura `VITE_API_URL` apuntando a la URL pública del backend.
- Cambia `NODE_ENV=production` en el backend para que la cookie de sesión use `secure: true` (requiere HTTPS).
- Considera migrar SQLite a PostgreSQL si esperas alto volumen concurrente (el esquema en `db.js` es fácilmente portable).

## Funciones incluidas
**Tienda pública:** inicio con destacados, catálogo con buscador/filtros (categoría, precio, orden), ficha de producto, carrito persistente (localStorage), checkout con descuento automático de stock.

**Panel admin:** login seguro, resumen con estadísticas y alertas de stock bajo, CRUD completo de productos con subida de imágenes, gestión de pedidos con cambio de estado.
