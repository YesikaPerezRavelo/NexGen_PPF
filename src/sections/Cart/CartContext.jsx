import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CART_KEY = "cart";

const normalize = (p) => ({
  id: String(p.id),
  name: p.name ?? p.title ?? "Producto",
  price: Number(p.price || 0),
  image: p.image || "",
  quantity: Math.max(1, Number(p.quantity || p.qty || 1)),
});

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(raw) ? raw.map(normalize) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:changed", { detail: items }));
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadCart());

  const addItem = (payload) => {
    const item = normalize(payload);
    setCart((prev) => {
      const i = prev.findIndex((p) => p.id === item.id);
      let next;
      if (i >= 0) next = prev.map((p, idx) => (idx === i ? { ...p, quantity: p.quantity + item.quantity } : p));
      else next = [...prev, item];
      saveCart(next);
      return next;
    });
  };

  const updateItem = ({ id, ...rest }) => {
    setCart((prev) => {
      const next = prev.map((p) => (p.id === String(id) ? { ...p, ...rest } : p));
      saveCart(next);
      return next;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const next = prev.filter((p) => p.id !== String(id));
      saveCart(next);
      return next;
    });
  };

  const clearCart = () => {
    saveCart([]);
    setCart([]);
  };

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const count = cart.reduce((acc, p) => acc + p.quantity, 0);

  useEffect(() => {
    const onAdd = (e) => addItem(e.detail);
    window.addEventListener("cart:add", onAdd);
    return () => window.removeEventListener("cart:add", onAdd);
  }, []);

  const value = { cart, addItem, updateItem, removeItem, clearCart, total, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
