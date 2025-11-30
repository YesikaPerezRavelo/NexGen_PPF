import React from 'react'
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
