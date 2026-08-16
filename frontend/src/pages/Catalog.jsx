import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

const SORT_LABELS = {
  new: "Nuevos lanzamientos",
  bestseller: "Más vendidos",
  offers: "Ofertas",
};

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [gender, setGender] = useState(params.get("gender") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState(params.get("sort") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.getCategories().then(setCategories).catch(() => {}); }, []);

  // Mantiene los filtros sincronizados si el usuario llega desde un enlace con
  // ?q=, ?category=, ?gender= o ?sort= (navbar, tiles de categoría, home).
  useEffect(() => {
    setQ(params.get("q") || "");
    setCategory(params.get("category") || "");
    setGender(params.get("gender") || "");
    setSort(params.get("sort") || "");
  }, [params]);

  useEffect(() => {
    setLoading(true);
    const filters = {};
    if (q) filters.q = q;
    if (category) filters.category = category;
    if (gender) filters.gender = gender;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (sort) filters.sort = sort;
    api.getProducts(filters).then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, [q, category, gender, minPrice, maxPrice, sort]);

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h2 className="section-title" style={{ marginTop: 0 }}>
        {sort && SORT_LABELS[sort] ? SORT_LABELS[sort] : "Catálogo"}
      </h2>
      <p className="section-subtitle">Encuentra tu fragancia ideal</p>

      <div className="filters-bar">
        <input type="text" placeholder="Buscar perfume…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Hombre / Mujer / Unisex</option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
          <option value="unisex">Unisex</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" placeholder="Precio mín." value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ width: 110 }} />
        <input type="number" placeholder="Precio máx." value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: 110 }} />
        <select value={["new","bestseller","offers"].includes(sort) ? "" : sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Ordenar por precio</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "#8b8378" }}>Cargando productos…</p>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#8b8378" }}>
          <p style={{ fontSize: 18, marginBottom: 6 }}>No se encontraron productos.</p>
          <p style={{ fontSize: 14 }}>Prueba con otra búsqueda o quita algunos filtros.</p>
        </div>
      ) : (
        <>
          <p className="results-count">{products.length} {products.length === 1 ? "producto encontrado" : "productos encontrados"}</p>
          <div className="grid">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </>
      )}
    </div>
  );
}
