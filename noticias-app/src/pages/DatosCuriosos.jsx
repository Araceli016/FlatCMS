import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

function DatosCuriosos() {
  const [curiosos, setCuriosos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/curiosos').then(r => r.json()).then(setCuriosos)
  }, [])

  return (
    <div className="pagina">
      <h1>💡 Datos Curiosos</h1>
      <div className="cards-grid">
        {curiosos.map(c => <Card key={c.id} {...c} />)}
      </div>
    </div>
  )
}

export default DatosCuriosos