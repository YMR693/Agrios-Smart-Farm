import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../BottomNav'

export default function Profile() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: 'Mohamed Ali',
    email: 'MohamedAli22@gmail.com',
    password: '••••••',
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSave = () => {
    // In a real app: call API to update user info
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleCancel = () => {
    setForm({
      name: 'Mohamed Ali',
      email: 'MohamedAli22@gmail.com',
      password: '••••••',
    })
    setSaved(false)
  }

  const handleLogout = () => {
    navigate('/login')
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

      <div style={{ padding: '24px 16px 0' }}>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8e8e0, #d0d0c8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 52, border: '3px solid white',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
            }}>
              🧑‍💼
            </div>
            {/* Edit badge */}
            <div style={{
              position: 'absolute', bottom: 2, right: 2,
              width: 26, height: 26, borderRadius: '50%',
              background: '#2a6e2a', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: '2px solid white'
            }}>
              <span style={{ color: 'white', fontSize: 12 }}>✎</span>
            </div>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{form.name}</h2>
        </div>

        {/* Account Info Card */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Account Information</h3>

          {/* Full Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              style={{
                width: '100%', padding: '10px 0',
                border: 'none', borderBottom: '1.5px solid #e0e0d8',
                fontSize: 15, background: 'transparent', outline: 'none',
                color: '#1a1a1a'
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: '100%', padding: '10px 0',
                border: 'none', borderBottom: '1.5px solid #e0e0d8',
                fontSize: 15, background: 'transparent', outline: 'none',
                color: '#1a1a1a'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: '100%', padding: '10px 0',
                border: 'none', borderBottom: '1.5px solid #e0e0d8',
                fontSize: 15, background: 'transparent', outline: 'none',
                color: '#1a1a1a'
              }}
            />
          </div>

          {/* Success message */}
          {saved && (
            <div style={{
              background: '#f0faf0', border: '1px solid #b3ddb3',
              borderRadius: 10, padding: '10px 14px',
              fontSize: 13, color: '#2a6e2a', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              ✅ Changes saved successfully!
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              className="btn-primary"
              onClick={handleSave}
              style={{ flex: 1 }}
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              style={{
                flex: 0.5, padding: '14px', borderRadius: 12,
                border: '1.5px solid #e0e0d8', background: 'white',
                fontSize: 15, fontWeight: 500, cursor: 'pointer', color: '#444'
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '14px', borderRadius: 12,
            border: '1.5px solid #ffcccc', background: '#fff5f5',
            fontSize: 15, fontWeight: 500, cursor: 'pointer', color: '#c0392b'
          }}
        >
          🚪 Log Out
        </button>

      </div>

      <BottomNav />
    </div>
  )
}
