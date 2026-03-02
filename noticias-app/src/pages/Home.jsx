import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Newspaper, Megaphone, Lightbulb, ArrowRight, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../components/Card'

function Home() {
  const [noticias, setNoticias] = useState([])
  const [anuncios, setAnuncios] = useState([])
  const [curiosos, setCuriosos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/noticias').then(r => r.json()).then(setNoticias)
    fetch('http://localhost:3001/api/anuncios').then(r => r.json()).then(setAnuncios)
    fetch('http://localhost:3001/api/curiosos').then(r => r.json()).then(setCuriosos)
  }, [])

  const Seccion = ({ titulo, icono: Icono, items, link, vivo, tipo }) => (
    <motion.section
      className="home-seccion"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="seccion-header">
        <h2>
          <Icono size={18} />
          {titulo}
          {vivo && <span className="vivo-dot" />}
        </h2>
        <Link to={link}>Ver todos <ArrowRight size={13} /></Link>
      </div>
      <div className="cards-grid">
        {items.slice(0, 3).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.45 }}
          >
            <Card {...item} tipo={tipo} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )

  return (
    <div className="home">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-deco" />
        <div className="hero-deco2" />
        <div className="hero-tag">
          <GraduationCap size={12} />
          UMSS — Generación de Software
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Tu espacio de información y aprendizaje
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Mantente al día con tareas, anuncios y datos curiosos de la materia
        </motion.p>
      </motion.section>

      <Seccion titulo="Últimas Noticias" icono={Newspaper} items={noticias} link="/noticias" vivo={true} tipo="noticias" />
      <Seccion titulo="Anuncios" icono={Megaphone} items={anuncios} link="/anuncios" tipo="anuncios" />
      <Seccion titulo="Datos Curiosos" icono={Lightbulb} items={curiosos} link="/datos-curiosos" tipo="curiosos" />
    </div>
  )
}

export default Home