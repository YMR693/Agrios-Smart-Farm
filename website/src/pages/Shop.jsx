import { useState } from 'react'
import BottomNav from '../BottomNav'

const categories = ['Tous', 'Outils', 'Semences', 'Irrigation', 'Protection']

const products = [
  {
    id: 1, name: 'Sonde Connectée V2', price: '89.50€',
    desc: 'Mesure pH, azote, humidité et température en temps réel via Bluetooth.',
    store: 'CASEM', category: 'Outils', tag: null, emoji: '📟',
    url: 'https://www.jardinetsaisons.fr/analyseur-de-sol-connecte-8-en-1-2028.html'
  },
  {
    id: 2, name: 'Compost Premium 50L', price: '12.90€',
    desc: 'Amendement organique 100% naturel enrichi en micro-organismes bénéfiques.',
    store: 'MAROSEM', category: 'Semences', tag: null, emoji: '🌱',
    url: 'https://www.amazon.fr/FERTILIGENE-Terreau-universel-50-L/dp/B009L5VFF4'
  },
  {
    id: 3, name: 'Kit Micro-Irrigation Pro', price: '129.50€',
    desc: 'Kit complet pour 50m² de culture. Installation facile sans outils spécifiques.',
    store: 'AGRIFERTIL', category: 'Irrigation', tag: null, emoji: '💧',
    url: 'https://www.leroymerlin.fr/produits/terrasse-jardin/arrosage-pompe-et-recuperateur-eau-de-pluie/lance-pistolet-arrosage-et-brosse-de-lavage/capteur-humidite-jardin-p.html'
  },
  {
    id: 4, name: "Sonde d'Humidité", price: '12.90€',
    desc: "Suivez l'état hydrique de votre sol en temps réel via LoRaWAN ou Sigfox.",
    store: 'CASEM', category: 'Irrigation', tag: 'Connecté', emoji: '📡',
    url: 'https://www.domadoo.fr/en/1205-smart-soil-moisture-sensor'
  },
  {
    id: 5, name: 'Engrais NPK Liquide 5L', price: '24.90€',
    desc: 'Formule équilibrée pour une nutrition complète de vos cultures.',
    store: 'AGRIFERTIL', category: 'Outils', tag: null, emoji: '🧪',
    url: 'https://www.amazon.fr/s?k=engrais+NPK+liquide+5L'
  },
  {
    id: 6, name: 'Filet Anti-Insectes', price: '18.00€',
    desc: 'Protection efficace contre les ravageurs sans pesticides.',
    store: 'MAROSEM', category: 'Protection', tag: null, emoji: '🛡️',
    url: 'https://www.amazon.fr/s?k=filet+anti+insectes+jardin'
  },
]

export default function Shop() {
  const [active, setActive] = useState('Tous')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    const matchCat = active === 'Tous' || p.category === active
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <span className="logo">Agrios</span>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#2a6e2a', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ color: 'white', fontSize: 16 }}>👤</span>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Rechercher des semences, outils ou engrais..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 80px 12px 40px',
              border: '1.5px solid #e0e0d8', borderRadius: 12,
              fontSize: 13, background: 'white', outline: 'none'
            }}
          />
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <button style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            background: '#2a6e2a', color: 'white', border: 'none',
            padding: '6px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer'
          }}>Filtrer</button>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: '7px 16px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
              border: '1.5px solid',
              borderColor: active === cat ? '#2a6e2a' : '#e0e0d8',
              background: active === cat ? '#2a6e2a' : 'white',
              color: active === cat ? 'white' : '#444',
              fontWeight: active === cat ? 600 : 400
            }}>{cat}</button>
          ))}
        </div>

        {/* Products */}
        {filtered.map(p => (
          <div key={p.id} style={{ marginBottom: 20 }}>
            {/* Product Image */}
            <div style={{
              height: 180, borderRadius: 16, marginBottom: 12,
              background: 'linear-gradient(135deg, #8fad6b, #2a6e2a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden'
            }}>
              <span style={{ fontSize: 64 }}>{p.emoji}</span>
              {p.tag && (
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: '#2a6e2a', color: 'white',
                  padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600
                }}>{p.tag}</div>
              )}
            </div>

            {/* Product Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</h3>
              <span style={{ color: '#2a6e2a', fontWeight: 700, fontSize: 16, flexShrink: 0, marginLeft: 8 }}>{p.price}</span>
            </div>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 8 }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#ff6b35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: 10 }}>●</span>
              </div>
              <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{p.store}</span>
            </div>
            <button className="btn-outline" onClick={() => window.open(p.url, '_blank')}>
            View on the website ↗
            </button>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}