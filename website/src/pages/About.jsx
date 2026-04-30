import BottomNav from '../BottomNav'

export default function About() {
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

      {/* Hero */}
      <div style={{ padding: '0 16px 24px' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>OUR PHILOSOPHY</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
              Sustainable <span style={{ color: '#2a6e2a' }}>farming</span>
            </h2>
          </div>
          <div style={{
            width: 130, height: 110, borderRadius: 16, overflow: 'hidden', flexShrink: 0,
            background: 'linear-gradient(135deg, #c8a96e, #4a7c3f)'
          }} />
        </div>

        <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 24 }}>
          At Agrios, we believe that technology should serve the earth, not exploit it. We are redesigning
          the future of agriculture through precision cultivation and ecosystem restoration.
        </p>

        <button className="btn-primary" style={{ width: 'auto', padding: '12px 20px', fontSize: 14, marginBottom: 32 }}>
          Discover Our Methods
        </button>

        {/* Stats */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 28, color: '#2a6e2a', marginBottom: 4 }}>💧</div>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>9.2M</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Litres of Water Saved</div>
          <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>
            Through our AI-driven irrigation cycles, we've reduced water waste by 40% across all partner farms.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div className="card" style={{ flex: 1 }}>
            <div style={{ fontSize: 24, color: '#2a6e2a', marginBottom: 4 }}>🌿</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#2a6e2a' }}>100%</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Eco-friendly products</div>
            <div style={{ height: 4, background: '#e0e0d8', borderRadius: 2 }}>
              <div style={{ width: '100%', height: '100%', background: '#2a6e2a', borderRadius: 2 }} />
            </div>
          </div>

          <div className="card" style={{ flex: 1.4 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Biodiversity Index</div>
                <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>
                  Our sensors have recorded a 3x increase in pollinator activity in managed zones compared to industrial standards.
                </p>
              </div>
              <div style={{
                width: 70, height: 70, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg, #8fad6b, #4a7c3f)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28
              }}>🐝</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}