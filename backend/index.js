const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// crear rutas 
function crearRutas(archivo) {
  const DB = path.join(__dirname, archivo)
  const router = require('express').Router()

  router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DB))
    res.json(data)
  })

  router.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DB))
    const nuevo = { id: Date.now(), ...req.body }
    data.push(nuevo)
    fs.writeFileSync(DB, JSON.stringify(data, null, 2))
    res.json(nuevo)
  })

  router.put('/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(DB))
    data = data.map(item => item.id == req.params.id ? { 
      ...item, 
      ...req.body,
      editado: true,
      fechaEdicion: new Date().toLocaleDateString('es-ES')
    } : item)
    fs.writeFileSync(DB, JSON.stringify(data, null, 2))
    res.json({ ok: true })
  })

  router.delete('/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(DB))
    data = data.filter(item => item.id != req.params.id)
    fs.writeFileSync(DB, JSON.stringify(data, null, 2))
    res.json({ ok: true })
  })

  return router
}

app.use('/api/noticias', crearRutas('noticias.json'))
app.use('/api/anuncios', crearRutas('anuncios.json'))
app.use('/api/curiosos', crearRutas('curiosos.json'))

app.post('/api/login', (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, 'usuarios.json')))
  const { usuario, password } = req.body
  const encontrado = usuarios.find(u => u.usuario === usuario && u.password === password)
  if (encontrado) {
    res.json({ ok: true })
  } else {
    res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' })
  }
})

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001')
})