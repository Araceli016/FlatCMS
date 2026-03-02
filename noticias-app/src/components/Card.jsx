import React from 'react'
import { Pencil, Trash2, Calendar, Newspaper, Megaphone, Lightbulb } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const categorias = {
  noticias: { label: 'Noticia', color: '#1a3a6b', fondo: '#eef2f9', icono: Newspaper },
  anuncios: { label: 'Anuncio', color: '#9B2335', fondo: '#fdf0f1', icono: Megaphone },
  curiosos: { label: 'Dato Curioso', color: '#065f46', fondo: '#ecfdf5', icono: Lightbulb },
}

function Card({ id, titulo, contenido, fecha, imagen, editado, fechaEdicion, tipo, onEditar, onEliminar }) {
  const navigate = useNavigate()
  const cat = categorias[tipo] || categorias.noticias
  const Icono = cat.icono

  return (
    <div className="card" onClick={() => !onEditar && navigate(`/${tipo}/${id}`)}>
      {imagen ? (
        <img src={imagen} alt={titulo} className="card-imagen" />
      ) : (
        <div className="card-imagen-placeholder">
          <Icono size={32} color="#ccc" />
        </div>
      )}
      <div className="card-body">
        <span className="card-categoria" style={{ background: cat.fondo, color: cat.color }}>
          {cat.label}
        </span>
        <h2 className="card-titulo">{titulo}</h2>
        <p className="card-contenido">{contenido}</p>
        <div className="card-footer">
          <small className="card-fecha">
            <Calendar size={11} />
            {fecha}
          </small>
        </div>
        {editado && (
          <small className="card-editado">
            ✏️ Editado el {fechaEdicion}
          </small>
        )}
        {(onEditar || onEliminar) && (
          <div className="card-acciones">
            {onEditar && (
              <button onClick={e => { e.stopPropagation(); onEditar() }}>
                <Pencil size={13} /> Editar
              </button>
            )}
            {onEliminar && (
              <button onClick={e => { e.stopPropagation(); onEliminar() }}>
                <Trash2 size={13} /> Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card