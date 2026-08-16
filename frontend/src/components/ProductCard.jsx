import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const outOfStock = product.stock <= 0;
  const hasOffer = product.compare_at_price && product.compare_at_price > product.price;
  const discountPct = hasOffer ? Math.round((1 - product.price / product.compare_at_price) * 100) : 0;
  const { addItem } = useCart();
  const { isSaved, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const saved = isSaved(product.id);

  const quickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="product-img-wrap">
        {outOfStock ? (
          <span className="badge badge-out">Agotado</span>
        ) : hasOffer ? (
          <span className="badge badge-offer">-{discountPct}%</span>
        ) : product.is_new ? (
          <span className="badge badge-new">Nuevo</span>
        ) : product.featured ? (
          <span className="badge badge-featured">Destacado</span>
        ) : null}
        <button className="wish-btn" onClick={toggleWishlist} aria-label={saved ? "Quitar de favoritos" : "Añadir a favoritos"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.5-9.3 9-9.3 9z"/></svg>
        </button>
        <img src={product.image_url || "/logo.png"} alt={product.name} loading="lazy" />
        <button className="quick-add" onClick={quickAdd} disabled={outOfStock} title="Añadir al carrito" aria-label="Añadir al carrito">
          {added ? "✓" : "+"}
        </button>
      </Link>
      <div className="product-info">
        <div className="product-cat">{product.brand || product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description?.slice(0, 80)}{product.description?.length > 80 ? "…" : ""}</p>
        <div className="product-footer">
          <span className="price">
            {hasOffer && <span className="price-compare">RD$ {product.compare_at_price.toLocaleString("es-DO")}</span>}
            RD$ {product.price.toLocaleString("es-DO")}
          </span>
          <Link to={`/producto/${product.id}`}><button className="small-btn" disabled={outOfStock}>{outOfStock ? "Agotado" : "Ver"}</button></Link>
        </div>
      </div>
    </div>
  );
}
