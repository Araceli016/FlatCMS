import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

function Anuncios() {
  const [anuncios, setAnuncios] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/anuncios').then(r => r.json()).then(setAnuncios)
  }, [])

  return (
    <div className="pagina">
      <h1>📢 Anuncios</h1>
      <div className="cards-grid">
        {anuncios.map(a => <Card key={a.id} {...a} />)}
      </div>
    </div>
  )
}

export default Anuncios