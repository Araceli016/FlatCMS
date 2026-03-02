import React, { useState, useEffect } from 'react'
import { Newspaper, Megaphone, Lightbulb, Upload, CheckCircle } from 'lucide-react'
import Card from '../components/Card'

const SECCIONES = [
  { key: 'noticias', label: 'Noticias', icono: Newspaper, api: 'http://localhost:3001/api/noticias' },
  { key: 'anuncios', label: 'Anuncios', icono: Megaphone, api: 'http://localhost:3001/api/anuncios' },
  { key: 'curiosos', label: 'Datos Curiosos', icono: Lightbulb, api: 'http://localhost:3001/api/curiosos' },
]

function Admin() {
  const [seccion, setSeccion] = useState(SECCIONES[0])
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ titulo: '', contenido: '', imagen: '' })
  const [editando, setEditando] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const cargar = () => {
      fetch(seccion.api)
        .then(r => r.json())
        .then(data => {
          setItems(data)
          setPreview(null)
          setEditando(null)
          setForm({ titulo: '', contenido: '', imagen: '' })
        })
    }

    cargar()
  }, [seccion])

  const handleImagen = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setForm({ ...form, imagen: reader.result })
    reader.readAsDataURL(file)
  }

  const guardar = async () => {
    if (!form.titulo || !form.contenido) {
      alert('Título y contenido son obligatorios')
      return
    }

    const hoy = new Date().toLocaleDateString('es-ES')

    if (editando) {
      await fetch(`${seccion.api}/${editando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, editado: true, fechaEdicion: hoy })
      })
    } else {
      await fetch(seccion.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, fecha: hoy })
      })
    }

    const guardado = await fetch(seccion.api).then(r => r.json())
    setItems(guardado)
    setPreview({ ...form, fecha: hoy })
    setForm({ titulo: '', contenido: '', imagen: '' })
    setEditando(null)
  }

  const editar = (item) => {
    setForm({ titulo: item.titulo, contenido: item.contenido, imagen: item.imagen || '' })
    setEditando(item.id)
    setPreview(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const eliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esto?')) return

    await fetch(`${seccion.api}/${id}`, { method: 'DELETE' })

    const actualizados = await fetch(seccion.api).then(r => r.json())
    setItems(actualizados)
  }

  return (
    <div className="admin">
      <h1>Panel del Docente</h1>

      <div className="admin-tabs">
        {SECCIONES.map(s => {
          const Icono = s.icono
          return (
            <button
              key={s.key}
              className={seccion.key === s.key ? 'tab activo' : 'tab'}
              onClick={() => setSeccion(s)}
            >
              <Icono size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {s.label}
            </button>
          )
        })}
      </div>

      <div className="admin-form">
        <h2>{editando ? 'Editando publicación' : 'Nueva publicación'}</h2>

        <input
          placeholder="Título"
          value={form.titulo}
          onChange={e => setForm({ ...form, titulo: e.target.value })}
        />

        <textarea
          placeholder="Contenido"
          value={form.contenido}
          onChange={e => setForm({ ...form, contenido: e.target.value })}
        />

        <label className="upload-label">
          <Upload size={16} />
          Subir imagen
          <input type="file" accept="image/*" onChange={handleImagen} />
        </label>

        {form.imagen && (
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <img
              src={form.imagen}
              alt="preview"
              className="imagen-preview"
              style={{ marginBottom: 0 }}
            />
            <button
              onClick={() => setForm({ ...form, imagen: '' })}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 30,
                height: 30,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>
          </div>
        )}

        <button className="btn-guardar" onClick={guardar}>
          {editando ? 'Actualizar' : 'Publicar'}
        </button>
      </div>

      {preview && (
        <div className="preview-seccion">
          <h3>
            <CheckCircle size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Así quedó publicado:
          </h3>
          <Card {...preview} />
        </div>
      )}

      <div className="admin-lista">
        <h2>Publicados en {seccion.label}</h2>
        <div className="cards-grid">
          {items.map(item => (
            <Card
              key={item.id}
              {...item}
              onEditar={() => editar(item)}
              onEliminar={() => eliminar(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin