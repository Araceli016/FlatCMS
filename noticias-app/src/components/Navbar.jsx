import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Newspaper } from 'lucide-react'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/noticias', label: 'Noticias' },
    { to: '/anuncios', label: 'Anuncios' },
    { to: '/datos-curiosos', label: 'Datos Curiosos' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><Newspaper size={18} />Generación de Software</Link>
      </div>

      <button className="navbar-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
        {menuAbierto ? <X size={22} /> : <Menu size={22} />}
      </button>

      <ul className={`navbar-links ${menuAbierto ? 'abierto' : ''}`}>
        {links.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={location.pathname === link.to ? 'activo' : ''}
              onClick={() => setMenuAbierto(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/admin" className="btn-admin" onClick={() => setMenuAbierto(false)}>
            Panel Admin
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar