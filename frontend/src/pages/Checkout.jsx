import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../api";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customer_name: "", customer_email: "", customer_phone: "", customer_address: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await api.createOrder({ ...form, items: items.map((i) => ({ id: i.id, qty: i.qty })) });
      clearCart();
      navigate("/pedido-confirmado");
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="cart-page">
      <h2>Finalizar compra</h2>
      <form onSubmit={submit} style={{ maxWidth: 460 }}>
        <div className="form-field">
          <label>Nombre completo</label>
          <input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Correo electrónico</label>
          <input type="email" required value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Dirección de entrega</label>
          <textarea required rows={3} value={form.customer_address} onChange={(e) => setForm({ ...form, customer_address: e.target.value })} />
        </div>
        {error && <p style={{ color: "#7a2b2b" }}>{error}</p>}
        <div className="cart-summary" style={{ margin: "20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}><span>Total</span><span>RD$ {total.toLocaleString("es-DO")}</span></div>
        </div>
        <button className="btn-gold" style={{ width: "100%" }} disabled={loading}>{loading ? "Procesando…" : "Confirmar pedido"}</button>
      </form>
    </div>
  );
}
