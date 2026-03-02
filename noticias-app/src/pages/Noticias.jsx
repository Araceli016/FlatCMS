import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

function Noticias() {
  const [noticias, setNoticias] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/noticias').then(r => r.json()).then(setNoticias)
  }, [])

  return (
    <div className="pagina">
      <h1>📰 Noticias</h1>
      <div className="cards-grid">
        {noticias.map(n => <Card key={n.id} {...n} />)}
      </div>
    </div>
  )
}

export default Noticias