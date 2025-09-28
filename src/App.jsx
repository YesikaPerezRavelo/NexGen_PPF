import { useState } from 'react'
import './App.css'
import Home from "../src/pages/Home"
import Footer from './layout/Footer'
import { Routes, Route } from 'react-router-dom'
import SideNavbar from './layout/SideNavbar'
import Shop from './pages/Shop'
// import Cart from './pages/Cart'  // si después lo querés usar


function App() {
  // ✅ Estado del carrito
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])


  // ✅ Función para agregar al carrito
  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1)
    setCartItems((prev) => [...prev, product])
  }


  return (
    <>
      <SideNavbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
        {/* <Route path="/cart" element={<Cart cartItems={cartItems} />} /> */}
      </Routes>
      <Footer />
    </>
  )
}


export default App
