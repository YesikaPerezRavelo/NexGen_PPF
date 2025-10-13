import { useState } from 'react'
import './App.css'
import Home from "../src/pages/Home"
import Footer from './layout/Footer'
import { Routes, Route } from 'react-router-dom'
import SideNavbar from './layout/SideNavbar'
import Shop from './pages/Shop'
// import Cart from './pages/Cart'  // si después lo querés usar
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import UserPanel from './pages/UserPanel'
import UnderConstruction from './pages/UnderConstruction'
import ProtectedRoute from './routes/ProtectedRoute'
import Cart from "./pages/Cart"
import { CartProvider } from './sections/Cart/CartContext'




function App() {

  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])



  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1)
    setCartItems((prev) => [...prev, product])
  }


  return (
    <>
     <CartProvider>
      <SideNavbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
        {/* <Route path="/cart" element={<Cart cartItems={cartItems} />} /> */}
        <Route path="/login" element={<Login />} />
  <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
  <Route path="/user" element={<ProtectedRoute><UserPanel /></ProtectedRoute>} /> 
  <Route path="/under-construction" element={<UnderConstruction />} /> 
    <Route path="/cart" element={<Cart />} />  

      </Routes>
      <Footer />
      </CartProvider>
    </>
  )
}


export default App
