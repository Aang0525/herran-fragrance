import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div style={{ padding: "0 24px 20px", color: "#c9a24b", fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>
          Herran Admin
        </div>
        <NavLink to="/admin" end className={({isActive}) => isActive ? "active" : ""}>Resumen</NavLink>
        <NavLink to="/admin/productos" className={({isActive}) => isActive ? "active" : ""}>Productos</NavLink>
        <NavLink to="/admin/pedidos" className={({isActive}) => isActive ? "active" : ""}>Pedidos</NavLink>
        <button onClick={async () => { await logout(); navigate("/admin/login"); }} style={{ marginTop: 20, borderTop: "1px solid #2a241f", paddingTop: 16 }}>
          Cerrar sesión ({admin?.email})
        </button>
      </aside>
      <main className="admin-main"><Outlet /></main>
    </div>
  );
}
