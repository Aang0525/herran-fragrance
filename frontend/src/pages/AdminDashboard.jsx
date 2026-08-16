import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => {});
    api.lowStock().then(setLowStock).catch(() => {});
    api.getOrders().then(setOrders).catch(() => {});
  }, []);

  const pendingOrders = orders.filter((o) => o.status === "pendiente").length;

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Resumen</h2>
      <div className="stat-cards">
        <div className="stat-card"><div style={{ color: "#8b8378", fontSize: 13 }}>Productos</div><div style={{ fontSize: 28, fontWeight: 600 }}>{products.length}</div></div>
        <div className="stat-card"><div style={{ color: "#8b8378", fontSize: 13 }}>Pedidos totales</div><div style={{ fontSize: 28, fontWeight: 600 }}>{orders.length}</div></div>
        <div className="stat-card"><div style={{ color: "#8b8378", fontSize: 13 }}>Pedidos pendientes</div><div style={{ fontSize: 28, fontWeight: 600 }}>{pendingOrders}</div></div>
        <div className="stat-card"><div style={{ color: "#8b8378", fontSize: 13 }}>Stock bajo</div><div style={{ fontSize: 28, fontWeight: 600, color: lowStock.length ? "#7a2b2b" : "inherit" }}>{lowStock.length}</div></div>
      </div>

      <h3>Productos con poco stock</h3>
      {lowStock.length === 0 ? <p style={{ color: "#8b8378" }}>Todo el inventario está en niveles saludables.</p> : (
        <table className="admin-table">
          <thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th></tr></thead>
          <tbody>
            {lowStock.map((p) => (
              <tr key={p.id}><td>{p.name}</td><td>{p.category}</td><td><span className="low-stock-tag">{p.stock} uds.</span></td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
