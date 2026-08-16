import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className="cart-page" style={{ textAlign: "center", maxWidth: 480 }}>
      <h2>Cuentas de cliente — próximamente</h2>
      <p style={{ color: "#8b8378", lineHeight: 1.7 }}>
        Todavía no necesitas una cuenta para comprar: elige tus fragancias, añádelas al carrito
        y completa tus datos de entrega al finalizar la compra. Pronto podrás guardar tus
        direcciones y ver tu historial de pedidos aquí.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
        <Link to="/catalogo"><button className="btn-gold">Ir al catálogo</button></Link>
        <a href="https://wa.me/18095550000" target="_blank" rel="noreferrer"><button className="btn-outline" style={{ borderColor: "#c9a24b", color: "#8a6d2e" }}>Escríbenos por WhatsApp</button></a>
      </div>
    </div>
  );
}
