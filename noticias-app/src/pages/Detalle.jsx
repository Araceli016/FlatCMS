import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const APIS = {
  noticias: 'http://localhost:3001/api/noticias',
  anuncios: 'http://localhost:3001/api/anuncios',
  curiosos: 'http://localhost:3001/api/curiosos',
}

function Detalle() {
  const { tipo, id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)

  useEffect(() => {
    fetch(APIS[tipo])
      .then(r => r.json())
      .then(data => {
        const encontrado = data.find(i => String(i.id) === String(id))
        setItem(encontrado)
      })
  }, [tipo, id])

  if (!item) return <div className="contenido">Cargando...</div>

  return (
    <motion.div
      className="detalle"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button className="detalle-volver" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Volver
      </button>

      {item.imagen && (
        <img
          src={item.imagen}
          alt={item.titulo}
          className="detalle-imagen"
        />
      )}

      <div className="detalle-body">
        <h1>{item.titulo}</h1>

        <small className="card-fecha">
          <Calendar size={12} /> {item.fecha}
        </small>

        {item.editado && (
          <small className="card-editado">
            {' '}Editado el {item.fechaEdicion}
          </small>
        )}

        <p>{item.contenido}</p>
      </div>
    </motion.div>
  )
}

export default Detalle