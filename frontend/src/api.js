const BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error en la solicitud");
  return data;
}

export const api = {
  getProducts: (params = {}) => request(`/products?${new URLSearchParams(params)}`),
  getFeatured: () => request("/products/featured"),
  getCategories: () => request("/products/categories"),
  getProduct: (id) => request(`/products/${id}`),
  createProduct: (data) => request("/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" }),
  lowStock: () => request("/products/admin/low-stock"),
  login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),
  createOrder: (data) => request("/orders", { method: "POST", body: JSON.stringify(data) }),
  getOrders: () => request("/orders"),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  uploadImage: async (file) => {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`${BASE}/api/upload`, { method: "POST", credentials: "include", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al subir imagen");
    return data;
  },
};
