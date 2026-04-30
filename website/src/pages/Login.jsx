import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #c8a96e 0%, #8fad6b 40%, #4a7c3f 100%)'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 60% 10%, rgba(255,220,100,0.6) 0%, transparent 60%)',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(240,240,232,0.97)',
        borderRadius: '24px 24px 0 0',
        padding: '32px 24px 40px',
        zIndex: 2
      }}>
        <div style={{ color: '#2a6e2a', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Agrios</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email or Username</label>
            <input
              type="text"
              placeholder="hello@cultivator.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Password</label>
              <Link to="#" style={{ color: '#2a6e2a', fontSize: 13, fontWeight: 500 }}>Forgot Password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#888'
              }}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 20 }}>
            <input type="checkbox" /> Remember this device
          </label>

          <button type="submit" className="btn-primary">
            Login to Dashboard →
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#666' }}>
          New to our ecosystem?{' '}
          <Link to="/register" style={{ color: '#1a1a1a', fontWeight: 600 }}>Create Account 🌱</Link>
        </p>
      </div>
    </div>
  )
}