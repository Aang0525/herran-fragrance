import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page" style={{ textAlign: "center" }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/catalogo"><button className="btn-gold" style={{ marginTop: 16 }}>Ver catálogo</button></Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Tu carrito</h2>
      {items.map((item) => (
        <div className="cart-row" key={item.id}>
          <img src={item.image_url || "/logo.png"} alt={item.name} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            <div style={{ color: "#8b8378", fontSize: 14 }}>RD$ {item.price.toLocaleString("es-DO")}</div>
          </div>
          <input type="number" min="1" value={item.qty} onChange={(e) => updateQty(item.id, Number(e.target.value))} style={{ width: 60, padding: 6 }} />
          <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: "#7a2b2b" }}>Eliminar</button>
        </div>
      ))}
      <div className="cart-summary">
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 600 }}>
          <span>Total</span><span>RD$ {total.toLocaleString("es-DO")}</span>
        </div>
        <button className="btn-gold" style={{ width: "100%", marginTop: 16 }} onClick={() => navigate("/checkout")}>Proceder al pago</button>
      </div>
    </div>
  );
}
