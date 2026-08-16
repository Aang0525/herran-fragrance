import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer" id="contacto">
      <div className="footer-top">
        <div className="footer-newsletter">
          <h4>Suscríbete y recibe 10% de descuento</h4>
          {subscribed ? (
            <p style={{ color: "#e3c778", fontSize: 14 }}>¡Gracias! Revisa tu correo pronto.</p>
          ) : (
            <form onSubmit={submit} className="footer-newsletter-form">
              <input type="email" required placeholder="Tu correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn-gold-sm" type="submit">Suscribirme</button>
            </form>
          )}
        </div>

        <div className="footer-col">
          <h4>Información</h4>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/cuenta">Cómo comprar</Link>
          <a href="https://wa.me/18095550000" target="_blank" rel="noreferrer">Contact Us</a>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Santo Domingo, República Dominicana</p>
          <p>hola@herranfragrance.com</p>
          <p>+1 (809) 555-0000</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 8h2V4h-2a4 4 0 0 0-4 4v2H9v4h2v8h4v-8h2.5l.5-4H15V8z"/></svg>
            </a>
            <a href="https://wa.me/18095550000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.5 8.5 0 1 1-12.3-7.6L3 5l1.3 5.3A8.5 8.5 0 0 1 21 11.5z"/><path d="M8.5 9.5c.3 2.7 2.3 4.7 5 5"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-brand-row">
        <img src="/logo.png" alt="Herran Fragrance" style={{ height: 34 }} />
        <span className="footer-tag">Tu esencia. Tu sello.</span>
      </div>

      <div className="footer-bottom">© {new Date().getFullYear()} Herran Fragrance. Todos los derechos reservados.</div>
    </footer>
  );
}
