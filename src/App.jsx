import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";


import Home from "./pages/Home";
import Footer from "./layout/Footer";
import SideNavbar from "./layout/SideNavbar";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import UserPanel from "./pages/UserPanel";
import UnderConstruction from "./pages/UnderConstruction";
import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import RandomUsers from "./pages/RandomUsers";
import DragonBallAPI from "./pages/DragonBallAPI";
import Crud from "./pages/Crud";
import BuildingPage from "./pages/BuildingPage";
import ProtectionAutoPage from "./pages/ProtectionAutoPage";
import WindowAutoProtectionPage from "./pages/WindowAutoProtectionPage";
import MockApiPage from "./pages/MockApiPage";


import { CartProvider } from "./sections/Cart/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";


export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);


  const navigate = useNavigate(); // 👈 acá creamos navigate


  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1);
    setCartItems((prev) => [...prev, product]);
  };


  // 🔍 buscador global (navbar)
  const handleGlobalSearch = (query) => {
    const text = query.trim();
    if (!text) return;


    // por ahora, todas las búsquedas globales van a /dragonball
    navigate(`/dragonball?search=${encodeURIComponent(text)}`);
  };


  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          {/* 👇 acá va el prop, dentro del JSX */}
          <SideNavbar
            cartCount={cartCount}
            onSearchSubmit={handleGlobalSearch}
          />


          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/shop"
              element={<Shop onAddToCart={handleAddToCart} />}
            />


            <Route
              path="/dragonball"
              element={<DragonBallAPI onAddToCart={handleAddToCart} />}
            />


            <Route
              path="/building-products"
              element={<BuildingPage onAddToCart={handleAddToCart} />}
            />


            <Route
              path="/automotive-protection"
              element={<ProtectionAutoPage onAddToCart={handleAddToCart} />}
            />


            <Route
              path="/auto-window-protection"
              element={
                <WindowAutoProtectionPage onAddToCart={handleAddToCart} />
              }
            />


            <Route
              path="/mock-api-products"
              element={<MockApiPage onAddToCart={handleAddToCart} />}
            />


            <Route path="/login" element={<Login />} />


            {/* protegidas */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allow={["admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/api"
              element={
                <ProtectedRoute allow={["admin"]}>
                  <Crud />
                </ProtectedRoute>
              }
            />


            <Route path="/random-users" element={<RandomUsers />} />


            <Route
              path="/user"
              element={
                <ProtectedRoute allow={["admin", "user"]}>
                  <UserPanel />
                </ProtectedRoute>
              }
            />


            <Route path="/under-construction" element={<UnderConstruction />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>


          <Footer />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
