import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => { api.getProduct(id).then(setProduct).catch(() => navigate("/catalogo")); }, [id]);

  if (!product) return <div className="container" style={{ padding: 60 }}>Cargando…</div>;
  const outOfStock = product.stock <= 0;

  return (
    <>
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/catalogo">Catálogo</Link> / <span>{product.name}</span>
      </div>
      <div className="product-detail">
        <div className="pd-img"><img src={product.image_url || "/logo.png"} alt={product.name} /></div>
        <div>
          <div className="product-cat">{product.category}</div>
          <h1 style={{ fontSize: 38, margin: "6px 0" }}>{product.name}</h1>
          {product.brand && <p style={{ color: "#8b8378", marginTop: -6 }}>{product.brand}</p>}
          <p style={{ fontSize: 24, fontWeight: 600, margin: "16px 0" }}>RD$ {product.price.toLocaleString("es-DO")}</p>
          <p style={{ lineHeight: 1.7, color: "#333" }}>{product.description}</p>
          <p style={{ fontSize: 13, color: outOfStock ? "#7a2b2b" : "#4a7a4a", marginTop: 12 }}>
            {outOfStock ? "Sin stock disponible" : `${product.stock} unidades disponibles`}
          </p>

          {!outOfStock && (
            <>
              <div className="qty-selector">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
              </div>
              <button className="btn-gold" onClick={() => { addItem(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); }}>
                {added ? "Añadido ✓" : "Añadir al carrito"}
              </button>
            </>
          )}

          <div className="pd-trust">
            <div className="pd-trust-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5z"/><path d="M9 12l2 2 4-4"/></svg>
              100% original y verificado
            </div>
            <div className="pd-trust-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="6" width="14" height="10" rx="1"/><path d="M15 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>
              Envío a todo el país
            </div>
            <div className="pd-trust-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
              Pago seguro o contra entrega
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
