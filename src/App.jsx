import { useState } from 'react'
import './App.css'
import Home from "../src/pages/Home"
import Footer from './layout/Footer'
import { Routes, Route } from 'react-router-dom'
import SideNavbar from './layout/SideNavbar'



function App() {
  

  return (
    <>
    <SideNavbar />
    <Routes>
   <Route path="/" element={<Home />} />
   </Routes>
    <Footer />
    </>
  )
}

export default App
