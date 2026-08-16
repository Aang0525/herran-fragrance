import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import About from "./pages/About";
import Discover from "./pages/Discover";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import ProtectedRoute from "./ProtectedRoute";

function PublicLayout({ children }) {
  return (<><Navbar />{children}<Footer /></>);
}

// Hace scroll suave a una sección (#coleccion, #sobre-nosotros, #contacto…)
// cuando la URL trae un hash, incluso si la navegación viene de otra página.
function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const id = hash.replace("#", "");
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = setTimeout(tryScroll, 80);
    return () => clearTimeout(t);
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/catalogo" element={<PublicLayout><Catalog /></PublicLayout>} />
        <Route path="/producto/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
        <Route path="/pedido-confirmado" element={<PublicLayout><OrderConfirmed /></PublicLayout>} />
        <Route path="/favoritos" element={<PublicLayout><Wishlist /></PublicLayout>} />
        <Route path="/cuenta" element={<PublicLayout><Account /></PublicLayout>} />
        <Route path="/nosotros" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/descubre" element={<PublicLayout><Discover /></PublicLayout>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="pedidos" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  );
}
