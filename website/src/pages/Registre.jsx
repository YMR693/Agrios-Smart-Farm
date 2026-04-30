import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [agreed, setAgreed] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div className="page" style={{ background: '#f0f0e8', padding: '40px 24px' }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Create Account</h2>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 28 }}>
        Start your journey into smart agriculture today.
      </p>

      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="hello@agrios.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, marginBottom: 24 }}>
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 2 }} />
          <span>
            I agree to the <span style={{ color: '#2a6e2a', fontWeight: 600 }}>Terms and Conditions</span> and{' '}
            <span style={{ color: '#2a6e2a', fontWeight: 600 }}>Privacy Policy</span>
          </span>
        </label>

        <button type="submit" className="btn-primary">Register</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#666' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#2a6e2a', fontWeight: 600 }}>Login</Link>
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ccc' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2a6e2a' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ccc' }} />
      </div>
    </div>
  )
}