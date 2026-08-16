import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [bestsellers, setBestsellers] = useState(null);
  const [newArrivals, setNewArrivals] = useState(null);
  const [spotlight, setSpotlight] = useState(null);

  useEffect(() => {
    api.getProducts({ sort: "bestseller" }).then((rows) => {
      setBestsellers(rows.slice(0, 4));
      // La pieza destacada es el producto con menos stock entre los más
      // vendidos: escasez real, tomada directo de la base de datos.
      if (rows.length) {
        const lowest = [...rows].sort((a, b) => a.stock - b.stock)[0];
        setSpotlight(lowest);
      }
    }).catch(() => setBestsellers([]));

    api.getProducts({ sort: "new" }).then((rows) => setNewArrivals(rows.slice(0, 3))).catch(() => setNewArrivals([]));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero-full">
        <div className="hero-full-glow" aria-hidden="true" />
        <img
          src="/products/rabanne-one-million.png"
          alt=""
          aria-hidden="true"
          className="hero-full-bottle"
        />
        <div className="hero-full-content">
          <p className="hero-full-eyebrow">Alta perfumería · Edición 2026</p>
          <h1 className="hero-full-title">Herran<br />Fragrance</h1>
          <p className="hero-full-sub">La esencia que define tu presencia.</p>
          <div className="hero-full-ctas">
            <Link to="/catalogo"><button className="btn-gold">Explorar perfumes</button></Link>
            <a href="#categorias"><button className="btn-outline">Descubrir nuestra colección</button></a>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="section" id="categorias" style={{ background: "#fff" }}>
        <p className="section-eyebrow">Nuestra colección</p>
        <h2 className="section-title" style={{ maxWidth: 640, margin: "0 auto 44px" }}>
          Una selección cuidadosamente elegida de fragancias para quienes buscan dejar una impresión inolvidable.
        </h2>
        <div className="tile-grid">
          <Link to="/catalogo?gender=hombre" className="tile-card">Perfumes para hombre</Link>
          <Link to="/catalogo?gender=mujer" className="tile-card">Perfumes para mujer</Link>
          <Link to="/catalogo?gender=unisex" className="tile-card">Unisex</Link>
          <Link to="/catalogo?sort=new" className="tile-card">Nuevos lanzamientos</Link>
          <Link to="/catalogo?sort=bestseller" className="tile-card">Más vendidos</Link>
          <Link to="/catalogo?sort=offers" className="tile-card">Ofertas</Link>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section">
        <div className="section-head-row">
          <div>
            <p className="section-eyebrow" style={{ textAlign: "left" }}>Favoritos de la casa</p>
            <h2 className="section-title" style={{ textAlign: "left", margin: 0 }}>Más vendidos</h2>
          </div>
          <Link to="/catalogo?sort=bestseller" className="link-arrow">Ver todo →</Link>
        </div>
        {!bestsellers ? (
          <p style={{ textAlign: "center", color: "#8b8378" }}>Cargando…</p>
        ) : bestsellers.length === 0 ? (
          <p style={{ textAlign: "center", color: "#8b8378" }}>Marca productos como destacados desde el panel admin para mostrarlos aquí.</p>
        ) : (
          <div className="grid">{bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>

      {/* SPOTLIGHT */}
      {spotlight && (
        <section className="spotlight-banner">
          <img src={spotlight.image_url || "/logo.png"} alt={spotlight.name} className="spotlight-img" />
          <div className="spotlight-text">
            <p className="spotlight-eyebrow">Pieza destacada</p>
            <h2>{spotlight.brand} — {spotlight.name}</h2>
            <p>{spotlight.description}</p>
            <p className="spotlight-stock">
              {spotlight.stock <= 5 ? `Quedan solo ${spotlight.stock} unidades disponibles.` : `${spotlight.stock} unidades disponibles.`}
            </p>
            <Link to={`/producto/${spotlight.id}`} className="link-arrow">Ver la pieza →</Link>
          </div>
        </section>
      )}

      {/* NUEVOS LANZAMIENTOS */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head-row">
          <div>
            <p className="section-eyebrow" style={{ textAlign: "left" }}>Recién llegados</p>
            <h2 className="section-title" style={{ textAlign: "left", margin: 0 }}>Nuevos lanzamientos</h2>
          </div>
          <Link to="/catalogo?sort=new" className="link-arrow">Ver todo →</Link>
        </div>
        {!newArrivals ? (
          <p style={{ textAlign: "center", color: "#8b8378" }}>Cargando…</p>
        ) : newArrivals.length === 0 ? (
          <p style={{ textAlign: "center", color: "#8b8378" }}>Marca productos como nuevos desde el panel admin para mostrarlos aquí.</p>
        ) : (
          <div className="grid">{newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>

      {/* QUIZ CTA */}
      <section className="quiz-cta">
        <div>
          <h2>¿Aún no sabes cuál es tu fragancia?</h2>
          <p>Responde unas preguntas y descubre las fragancias que mejor se adaptan a ti.</p>
          <Link to="/descubre"><button className="btn-gold">Descubre tu fragancia</button></Link>
        </div>
      </section>

      {/* MARCA */}
      <section className="story-section">
        <div className="story-inner">
          <div className="story-img"><img src="/logo.png" alt="Herran Fragrance" /></div>
          <div>
            <div className="story-eyebrow">Nuestra casa</div>
            <h2>Tu aroma. Tu identidad. Tu presencia.</h2>
            <p>Herran Fragrance selecciona cada frasco con un mismo criterio: calidad, identidad y elegancia. No vendemos imitaciones — cada perfume es 100% original.</p>
            <Link to="/nosotros" className="link-arrow">Conocer más →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
