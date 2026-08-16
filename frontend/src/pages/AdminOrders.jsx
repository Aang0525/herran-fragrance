import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const load = () => api.getOrders().then(setOrders).catch(() => {});
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => { await api.updateOrderStatus(id, status); load(); };

  return (
    <div>
      <h2>Pedidos</h2>
      <table className="admin-table">
        <thead><tr><th>#</th><th>Cliente</th><th>Contacto</th><th>Productos</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer_name}</td>
              <td>{o.customer_email}<br />{o.customer_phone}</td>
              <td>{o.items.map((i) => `${i.qty}x #${i.id}`).join(", ")}</td>
              <td>RD$ {o.total.toLocaleString("es-DO")}</td>
              <td>
                <select value={o.status} onChange={(e) => changeStatus(o.id, e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="procesando">Procesando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </td>
              <td>{new Date(o.created_at).toLocaleDateString("es-DO")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
