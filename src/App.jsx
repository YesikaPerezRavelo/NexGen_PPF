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


function App() {

  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])



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
        <Route path="/login" element={<Login />} />
  <Route path="/admin" element={<AdminPanel />} />
  <Route path="/user" element={<UserPanel />} /> 

      </Routes>
      <Footer />
    </>
  )
}


export default App
