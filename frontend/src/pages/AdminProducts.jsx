import { useEffect, useState } from "react";
import { api } from "../api";

const empty = { name: "", brand: "", description: "", price: "", category: "", stock: "", image_url: "", featured: false, low_stock_threshold: 5, gender: "unisex", is_new: false, compare_at_price: "" };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = () => api.getProducts().then(setProducts).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setEditingId(null); setModalOpen(true); };
  const openEdit = (p) => {
    setForm({ ...p, gender: p.gender || "unisex", is_new: !!p.is_new, compare_at_price: p.compare_at_price ?? "" });
    setEditingId(p.id);
    setModalOpen(true);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try { const { url } = await api.uploadImage(file); setForm((f) => ({ ...f, image_url: url })); }
    catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      low_stock_threshold: Number(form.low_stock_threshold) || 5,
      compare_at_price: form.compare_at_price === "" ? null : Number(form.compare_at_price),
    };
    try {
      if (editingId) await api.updateProduct(editingId, payload);
      else await api.createProduct(payload);
      setModalOpen(false); load();
    } catch (err) { alert(err.message); }
  };

  const remove = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    await api.deleteProduct(id); load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Productos</h2>
        <button className="btn-gold" onClick={openNew}>+ Nuevo producto</button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Género</th><th>Precio</th><th>Stock</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td><img src={p.image_url || "/logo.png"} alt="" style={{ width: 40, height: 40, objectFit: "contain", background: "#f8f6f1" }} /></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td style={{ textTransform: "capitalize" }}>{p.gender || "unisex"}</td>
              <td>
                {p.compare_at_price ? <span style={{ textDecoration: "line-through", color: "#8b8378", marginRight: 6 }}>RD$ {p.compare_at_price.toLocaleString("es-DO")}</span> : null}
                RD$ {p.price.toLocaleString("es-DO")}
              </td>
              <td>{p.stock <= p.low_stock_threshold ? <span className="low-stock-tag">{p.stock}</span> : p.stock}</td>
              <td style={{ fontSize: 12 }}>
                {p.featured ? "★ Destacado " : ""}{p.is_new ? "🆕 Nuevo" : ""}{!p.featured && !p.is_new ? "—" : ""}
              </td>
              <td>
                <button onClick={() => openEdit(p)} style={{ marginRight: 8, background: "none", border: "1px solid #ddd", padding: "4px 10px" }}>Editar</button>
                <button onClick={() => remove(p.id)} style={{ background: "none", border: "1px solid #7a2b2b", color: "#7a2b2b", padding: "4px 10px" }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{editingId ? "Editar producto" : "Nuevo producto"}</h3>
            <form onSubmit={save}>
              <div className="form-field"><label>Nombre</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="form-field"><label>Marca</label><input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></div>
              <div className="form-field"><label>Descripción</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="form-field" style={{ flex: 1 }}><label>Precio (RD$)</label><input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div className="form-field" style={{ flex: 1 }}><label>Stock</label><input type="number" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="form-field" style={{ flex: 1 }}><label>Categoría</label><input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                <div className="form-field" style={{ flex: 1 }}>
                  <label>Género</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                    <option value="unisex">Unisex</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label>Precio de comparación (RD$) — opcional, para mostrar oferta</label>
                <input type="number" placeholder="Ej: 5400 (deja vacío si no está en oferta)" value={form.compare_at_price} onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })} />
              </div>
              <div className="form-field"><label>Imagen</label>
                <input type="file" accept="image/*" onChange={handleImage} />
                {uploading && <span style={{ fontSize: 12 }}>Subiendo…</span>}
                {form.image_url && <img src={form.image_url} alt="" style={{ width: 60, marginTop: 6 }} />}
              </div>
              <div className="form-field"><label>Umbral de stock bajo</label><input type="number" value={form.low_stock_threshold} onChange={(e) => setForm({ ...form, low_stock_threshold: e.target.value })} /></div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, marginBottom: 10 }}>
                <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Producto destacado (más vendido)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, marginBottom: 16 }}>
                <input type="checkbox" checked={!!form.is_new} onChange={(e) => setForm({ ...form, is_new: e.target.checked })} /> Nuevo lanzamiento
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-gold" type="submit">Guardar</button>
                <button type="button" onClick={() => setModalOpen(false)} style={{ background: "none", border: "1px solid #ddd", padding: "13px 20px" }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
