const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const DB = path.join(__dirname, '../noticias.json')

// MOSTRAR NOTICIAS  
router.get('/', (req, res) => {
  const noticias = JSON.parse(fs.readFileSync(DB))
  res.json(noticias)
})

// CREAR UNA NOTICIA
router.post('/', (req, res) => {
  const noticias = JSON.parse(fs.readFileSync(DB))
  const nueva = { id: Date.now(), ...req.body }
  noticias.push(nueva)
  fs.writeFileSync(DB, JSON.stringify(noticias, null, 2))
  res.json(nueva)
})

// EDITAR NOTICIAS
router.put('/:id', (req, res) => {
  let noticias = JSON.parse(fs.readFileSync(DB))
  noticias = noticias.map(n => n.id == req.params.id ? { ...n, ...req.body } : n)
  fs.writeFileSync(DB, JSON.stringify(noticias, null, 2))
  res.json({ ok: true })
})

// ELIMINAR NOTICIA
router.delete('/:id', (req, res) => {
  let noticias = JSON.parse(fs.readFileSync(DB))
  noticias = noticias.filter(n => n.id != req.params.id)
  fs.writeFileSync(DB, JSON.stringify(noticias, null, 2))
  res.json({ ok: true })
})

module.exports = router