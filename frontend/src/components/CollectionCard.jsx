import { Link } from "react-router-dom";

export default function CollectionCard({ product }) {
  const outOfStock = product.stock <= 0;
  return (
    <Link to={`/producto/${product.id}`} className="coll-card">
      <div className="coll-card-pedestal">
        {outOfStock && <span className="badge badge-out" style={{ top: 8, left: 8 }}>Agotado</span>}
        <img src={product.image_url || "/logo.png"} alt={product.name} loading="lazy" />
      </div>
      <div className="coll-card-name">{product.name}</div>
      <div className="coll-card-price">RD$ {product.price.toLocaleString("es-DO")}</div>
    </Link>
  );
}
