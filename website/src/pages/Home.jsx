import { useNavigate } from 'react-router-dom'
import BottomNav from '../BottomNav'

export default function Home() {
  const navigate = useNavigate()

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

      {/* Hero Banner */}
      <div style={{
        margin: '0 16px 24px',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        height: 220
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #c8a96e 0%, #8fad6b 40%, #2a6e2a 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 20%, rgba(255,220,100,0.5) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'relative', padding: '28px 24px', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontSize: 26, fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>
            The future of agriculture is in your hands.
          </h1>
          <button className="btn-primary" style={{ width: 'auto', padding: '12px 24px', fontSize: 14 }}
            onClick={() => navigate('/tracking')}>
            Start the analysis
          </button>
        </div>
      </div>

      {/* Services */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 11, color: '#888', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>EXPERTISE</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Our Services</h2>

        <div style={{ display: 'flex', gap: 12 }}>
          {/* Soil Tracking */}
          <div className="card" style={{ flex: 1 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📊</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Soil tracking</h3>
            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 12 }}>
              Real-time analysis of soil moisture, nutrients, and overall soil health to optimize your yields.
            </p>
            <button onClick={() => navigate('/tracking')} style={{
              background: 'none', border: 'none', color: '#2a6e2a',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', padding: 0
            }}>
              Discover →
            </button>
          </div>

          {/* Shop */}
          <div className="card" style={{ flex: 1, background: '#f8f8f0' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>👍</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>SHOP</h3>
            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 12 }}>
              We offer a premium selection of seeds and advanced technological tools for modern farmers.
            </p>
            <button onClick={() => navigate('/shop')} style={{
              background: 'none', border: 'none', color: '#2a6e2a',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', padding: 0
            }}>
              Découvrir →
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}