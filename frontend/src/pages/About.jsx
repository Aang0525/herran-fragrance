import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <section className="story-section">
        <div className="story-inner">
          <div className="story-img"><img src="/logo.png" alt="Herran Fragrance" /></div>
          <div>
            <div className="story-eyebrow">Nuestra casa</div>
            <h2>Tu aroma. Tu identidad. Tu presencia.</h2>
            <p>Herran Fragrance selecciona cada frasco con un mismo criterio: calidad, identidad y elegancia. Trabajamos directamente con casas reconocidas —Paco Rabanne, Burberry, Versace, Armaf, Carolina Herrera y más— para ofrecerte fragancias 100% originales.</p>
            <p>No vendemos imitaciones. Cada perfume que llega a tus manos pasa por verificación de autenticidad antes de salir de nuestro almacén en Santo Domingo.</p>
            <Link to="/catalogo"><button className="btn-gold" style={{ marginTop: 10 }}>Explorar catálogo</button></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <h2 className="section-title">Cómo trabajamos</h2>
        <p className="section-subtitle">Tres principios que no negociamos</p>
        <div className="value-props-inner" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="value-prop">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5z"/><path d="M9 12l2 2 4-4"/></svg>
            <div>
              <div className="value-prop-title">100% originales</div>
              <div className="value-prop-sub">Verificados antes de cada envío</div>
            </div>
          </div>
          <div className="value-prop">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="6" width="14" height="10" rx="1"/><path d="M15 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>
            <div>
              <div className="value-prop-title">Envío a todo el país</div>
              <div className="value-prop-sub">Gratis desde RD$ 3,000</div>
            </div>
          </div>
          <div className="value-prop">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5a8.5 8.5 0 1 1-3.8-7.1"/><path d="M21 3l-9 9"/><path d="M13 3h8v8"/></svg>
            <div>
              <div className="value-prop-title">Atención personalizada</div>
              <div className="value-prop-sub">Te asesoramos por WhatsApp</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
