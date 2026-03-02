import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, User } from 'lucide-react'

function Login({ setAutenticado }) {
  const [form, setForm] = useState({ usuario: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const ingresar = async () => {
    if (!form.usuario || !form.password) return setError('Completa todos los campos')
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (data.ok) {
      sessionStorage.setItem('admin', 'true')
      setAutenticado(true)
      navigate('/admin')
    } else {
      setError(data.mensaje)
    }
  }

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="login-box">
        <h1>Panel del Docente</h1>
        <p>Ingresa tus credenciales para continuar</p>

        <div className="login-campo">
          <User size={16} />
          <input
            placeholder="Usuario"
            value={form.usuario}
            onChange={e => setForm({ ...form, usuario: e.target.value })}
          />
        </div>

        <div className="login-campo">
          <Lock size={16} />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && ingresar()}
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="btn-guardar" onClick={ingresar}>Ingresar</button>
      </div>
    </motion.div>
  )
}

export default Login