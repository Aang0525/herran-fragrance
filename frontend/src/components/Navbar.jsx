import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(q ? `/catalogo?q=${encodeURIComponent(q)}` : "/catalogo");
    setSearchOpen(false);
    setQ("");
    close();
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <button className="nav-toggle" aria-label="Abrir menú" onClick={() => setOpen(true)}>☰</button>

          <nav className={`nav-links nav-links-left${open ? " open" : ""}`}>
            <button className="nav-toggle nav-close" aria-label="Cerrar menú" onClick={close}>✕</button>
            <NavLink to="/catalogo" onClick={close} className={({ isActive }) => isActive ? "active-link" : ""}>Colección</NavLink>
            <NavLink to="/catalogo?gender=hombre" onClick={close}>Hombre</NavLink>
            <NavLink to="/catalogo?gender=mujer" onClick={close}>Mujer</NavLink>
            <div className="mobile-only-links">
              <NavLink to="/descubre" onClick={close}>Descubre tu fragancia</NavLink>
              <NavLink to="/nosotros" onClick={close}>Nosotros</NavLink>
              <NavLink to="/favoritos" onClick={close}>Favoritos {wishCount > 0 && <span className="cart-badge">{wishCount}</span>}</NavLink>
              <NavLink to="/cart" onClick={close}>Carrito {count > 0 && <span className="cart-badge">{count}</span>}</NavLink>
            </div>
          </nav>

          <Link to="/" className="brand" onClick={close}>
            <img src="/logo.png" alt="Herran Fragrance" />
            <span className="brand-lockup">
              <span className="brand-name">Herran</span>
              <span className="brand-sub">Fragrance</span>
            </span>
          </Link>

          <nav className="nav-links nav-links-right">
            <NavLink to="/descubre">Descubre tu fragancia</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
          </nav>

          <div className="nav-icons">
            <button className="icon-btn" aria-label="Buscar" onClick={() => setSearchOpen((s) => !s)}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            </button>
            <Link to="/cuenta" className="icon-btn" aria-label="Mi cuenta">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </Link>
            <Link to="/favoritos" className="icon-btn" aria-label="Favoritos">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.5-9.3 9-9.3 9z"/></svg>
              {wishCount > 0 && <span className="cart-badge icon-badge">{wishCount}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Carrito">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
              {count > 0 && <span className="cart-badge icon-badge">{count}</span>}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="nav-search-bar">
            <form className="nav-search-form" onSubmit={submitSearch}>
              <input autoFocus type="text" placeholder="Buscar fragancia…" value={q} onChange={(e) => setQ(e.target.value)} />
              <button type="submit" className="icon-btn" aria-label="Buscar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              </button>
            </form>
          </div>
        )}
      </header>
      <div className={`nav-scrim${open ? " open" : ""}`} onClick={close} />
    </>
  );
}
