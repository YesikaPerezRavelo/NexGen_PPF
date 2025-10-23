// import { useState } from 'react'
// import './App.css'
// import Home from "../src/pages/Home"
// import Footer from './layout/Footer'
// import { Routes, Route } from 'react-router-dom'
// import SideNavbar from './layout/SideNavbar'
// import Shop from './pages/Shop'
// import Login from './pages/Login'
// import AdminPanel from './pages/AdminPanel'
// import UserPanel from './pages/UserPanel'
// import UnderConstruction from './pages/UnderConstruction'
// import ProtectedRoute from './routes/ProtectedRoute'
// import Cart from "./pages/Cart"
// import { CartProvider } from './sections/Cart/CartContext'
// import Contact from "./pages/Contact"




// function App() {

//   const [cartCount, setCartCount] = useState(0)
//   const [cartItems, setCartItems] = useState([])



//   const handleAddToCart = (product) => {
//     setCartCount((c) => c + 1)
//     setCartItems((prev) => [...prev, product])
//   }


//   return (
//     <>
//      <CartProvider>
//       <SideNavbar cartCount={cartCount} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
//         {/* <Route path="/cart" element={<Cart cartItems={cartItems} />} /> */}
//         <Route path="/login" element={<Login />} />
//   <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
//   <Route path="/user" element={<ProtectedRoute><UserPanel /></ProtectedRoute>} /> 
//   <Route path="/under-construction" element={<UnderConstruction />} /> 
//     <Route path="/cart" element={<Cart />} />  
//     <Route path="/contact" element={<Contact />} />

//       </Routes>
//       <Footer />
//       </CartProvider>
//     </>
//   )
// }


// export default App


// src/App.jsx
import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import { Routes, Route } from "react-router-dom";
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


// 🧰 Providers
import { CartProvider } from "./sections/Cart/CartContext";
import { AuthProvider } from "./context/AuthContext";     // << nuevo
import { UserProvider } from "./context/UserContext";     // << si usás random user


export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);


  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1);
    setCartItems((prev) => [...prev, product]);
  };


  return (
    // 🔐 Auth y 👤 User arriba de TODO lo que use useAuth/useContext
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <SideNavbar cartCount={cartCount} />


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
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
