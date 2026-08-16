import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("herran_cart")) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("herran_cart", JSON.stringify(items)); }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, image_url: product.image_url, qty }];
    });
  };
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, qty) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const clearCart = () => setItems([]);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
