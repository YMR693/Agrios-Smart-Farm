import { useState } from 'react'
import BottomNav from '../BottomNav'

// Products recommended after ML analysis
const recommendedProducts = [
  {
    id: 1, name: 'Bio-Boost Mineral', price: '199.50€',
    desc: 'A balanced mineral fertilizer designed to promote overall plant growth.',
    store: 'CASEM', emoji: '🌿'
  },
  {
    id: 2, name: 'SeaVital Max', price: '239.50€',
    desc: 'An algae extract rich in trace elements that acts as a natural plant tonic to enhance plant vitality.',
    store: 'AGRIFERTIL', emoji: '🧴'
  },
  {
    id: 3, name: 'NPK Starter Kit', price: '59.90€',
    desc: 'Complete nutrient starter kit tailored for soil deficiencies detected by our sensors.',
    store: 'MAROSEM', emoji: '🧪'
  },
]

export default function Tracking() {
  const [form, setForm] = useState({ pH: '', humidity: '', N: '', P: '', K: '' })
  const [result, setCrop] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const { pH, humidity, N, P, K } = form
    if (!pH || !humidity || !N || !P || !K) {
      setError('Please fill in all fields.')
      return
    }
    setError(null)
    setLoading(true)
    setShowResults(false)

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nitrogen: parseFloat(N),
          Phosphorus: parseFloat(P),
          Potassium: parseFloat(K),
          Humidity: parseFloat(humidity),
          pH_Value: parseFloat(pH),
        }),
      })

      if (!response.ok) throw new Error('API error')
      const data = await response.json()
      setCrop(data.crop || data.recommendation || 'Unknown')
      setShowResults(true)
    } catch (err) {
      setError('Could not connect to the API. Make sure Flask is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setShowResults(false)
    setCrop(null)
    setForm({ pH: '', humidity: '', N: '', P: '', K: '' })
  }

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

      {!showResults ? (
        <>
          {/* Hero Banner */}
          <div style={{
            margin: '0 16px 20px',
            borderRadius: 20, overflow: 'hidden',
            position: 'relative', height: 180
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #1a3a1a 0%, #2a6e2a 60%, #8fad6b 100%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 80% 20%, rgba(255,220,100,0.3) 0%, transparent 60%)',
            }} />
            <div style={{ position: 'relative', padding: '28px 24px', zIndex: 1 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>
                Analysis &<br />Performance
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.5 }}>
                Monitor your soil health in real time to optimize your yields and preserve your land.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div style={{ padding: '0 16px' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>🧪</span>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>New measurement</h3>
              </div>

              {/* Row 1: pH + Humidity */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>Soil pH</label>
                  <input
                    name="pH"
                    type="number"
                    placeholder="6.5"
                    value={form.pH}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="14"
                    style={{
                      width: '100%', padding: '10px 12px',
                      border: '1.5px solid #e0e0d8', borderRadius: 10,
                      fontSize: 14, background: '#fafafa', outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>Humidité (%)</label>
                  <input
                    name="humidity"
                    type="number"
                    placeholder="25"
                    value={form.humidity}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    style={{
                      width: '100%', padding: '10px 12px',
                      border: '1.5px solid #e0e0d8', borderRadius: 10,
                      fontSize: 14, background: '#fafafa', outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* NPK label */}
              <div style={{ fontSize: 11, fontWeight: 600, color: '#888', letterSpacing: 1, marginBottom: 10 }}>
                COMPOSITION NPK
              </div>

              {/* Row 2: N + P + K */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>Azote (N)</label>
                  <input
                    name="N"
                    type="number"
                    placeholder="mg/kg"
                    value={form.N}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    style={{
                      width: '100%', padding: '10px 8px',
                      border: '1.5px solid #e0e0d8', borderRadius: 10,
                      fontSize: 13, background: '#fafafa', outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>Phosphore (P)</label>
                  <input
                    name="P"
                    type="number"
                    placeholder="mg/kg"
                    value={form.P}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    style={{
                      width: '100%', padding: '10px 8px',
                      border: '1.5px solid #e0e0d8', borderRadius: 10,
                      fontSize: 13, background: '#fafafa', outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>Potassium (K)</label>
                  <input
                    name="K"
                    type="number"
                    placeholder="mg/kg"
                    value={form.K}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    style={{
                      width: '100%', padding: '10px 8px',
                      border: '1.5px solid #e0e0d8', borderRadius: 10,
                      fontSize: 13, background: '#fafafa', outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  background: '#fff0f0', border: '1px solid #ffcccc',
                  borderRadius: 10, padding: '10px 14px',
                  fontSize: 13, color: '#c0392b', marginBottom: 16
                }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Submit */}
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {loading ? (
                  <>
                    <span style={{ fontSize: 16 }}>⏳</span> Analyzing...
                  </>
                ) : (
                  <>
                    Generate recommendations ✨
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Results View */}
          <div style={{ padding: '0 16px' }}>

            {/* Crop Result Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1a3a1a, #2a6e2a)',
              borderRadius: 20, padding: '24px 20px', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 16
            }}>
              <span style={{ fontSize: 48 }}>🌾</span>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Recommended crop</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'white', textTransform: 'capitalize' }}>{result}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Based on your soil analysis</div>
              </div>
            </div>

            {/* Recommended Products */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Recommended solutions</h2>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>Products specifically selected for your plot</p>

            {recommendedProducts.map(p => (
              <div key={p.id} style={{ marginBottom: 20 }}>
                {/* Product Image */}
                <div style={{
                  height: 180, borderRadius: 16, marginBottom: 12,
                  background: 'linear-gradient(135deg, #8fad6b, #2a6e2a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <span style={{ fontSize: 72 }}>{p.emoji}</span>
                </div>

                {/* Info */}
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
                <button className="btn-outline">View on the website ↗</button>
              </div>
            ))}

            {/* New Analysis button */}
            <button
              className="btn-primary"
              onClick={handleReset}
              style={{ marginTop: 4, marginBottom: 8 }}
            >
              ← New Analysis
            </button>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  )
}
