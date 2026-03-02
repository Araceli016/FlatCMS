import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Noticias from './pages/Noticias'
import Anuncios from './pages/Anuncios'
import DatosCuriosos from './pages/DatosCuriosos'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Detalle from './pages/Detalle'
import './App.css'

function App() {
  const [autenticado, setAutenticado] = useState(
    sessionStorage.getItem('admin') === 'true'
  )

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="contenido">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/anuncios" element={<Anuncios />} />
            <Route path="/datos-curiosos" element={<DatosCuriosos />} />
            <Route path="/:tipo/:id" element={<Detalle />} />
            <Route path="/login" element={
              autenticado ? <Navigate to="/admin" /> : <Login setAutenticado={setAutenticado} />
            } />
            <Route path="/admin" element={
              autenticado ? <Admin setAutenticado={setAutenticado} /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App