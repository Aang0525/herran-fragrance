import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page" style={{ textAlign: "center" }}>
        <h2>Tu lista de favoritos está vacía</h2>
        <p style={{ color: "#8b8378" }}>Toca el corazón en cualquier fragancia para guardarla aquí.</p>
        <Link to="/catalogo"><button className="btn-gold" style={{ marginTop: 16 }}>Ver catálogo</button></Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Tus favoritos</h2>
      {items.map((item) => (
        <div className="cart-row" key={item.id}>
          <Link to={`/producto/${item.id}`}><img src={item.image_url || "/logo.png"} alt={item.name} /></Link>
          <div style={{ flex: 1 }}>
            <Link to={`/producto/${item.id}`} style={{ fontWeight: 600 }}>{item.name}</Link>
            <div style={{ color: "#8b8378", fontSize: 14 }}>RD$ {item.price.toLocaleString("es-DO")}</div>
          </div>
          <button
            className="small-btn"
            disabled={item.stock <= 0}
            onClick={() => { addItem(item, 1); }}
          >
            {item.stock <= 0 ? "Agotado" : "Añadir al carrito"}
          </button>
          <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", color: "#7a2b2b" }}>Quitar</button>
        </div>
      ))}
    </div>
  );
}
