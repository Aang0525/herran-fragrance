import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("herran_wishlist")) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("herran_wishlist", JSON.stringify(items)); }, [items]);

  const isSaved = (id) => items.some((i) => i.id === id);

  const toggle = (product) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) return prev.filter((i) => i.id !== product.id);
      return [...prev, { id: product.id, name: product.name, price: product.price, image_url: product.image_url, category: product.category, stock: product.stock }];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <WishlistContext.Provider value={{ items, isSaved, toggle, remove, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
