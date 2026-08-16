import { Link } from "react-router-dom";
export default function OrderConfirmed() {
  return (
    <div className="cart-page" style={{ textAlign: "center" }}>
      <h2>¡Gracias por tu compra!</h2>
      <p style={{ color: "#8b8378" }}>Hemos recibido tu pedido y te contactaremos pronto para confirmar la entrega.</p>
      <Link to="/catalogo"><button className="btn-gold" style={{ marginTop: 16 }}>Seguir comprando</button></Link>
    </div>
  );
}
