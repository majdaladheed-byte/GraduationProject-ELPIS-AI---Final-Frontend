import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import { ROUTES } from '../utils/constants.js'
import {registerApi} from '../api/authApi.js'

const BORDER = '#d1e3f8'
const PRIMARY = '#2a7fd4'
const TITLE_COLOR = '#1a1a2e'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading] = useState(false)
  const [error] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const result = await registerApi({
      username,
      email,
      password,
    })

    console.log(result)
    alert('Registered successfully!')
  } catch (err) {
    console.error(err)
    alert('Register failed')
  }
}

  return (
    <PageContainer>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          maxWidth: '420px',
          margin: '20px auto 0',
          padding: '40px',
        }}
      >
        <h1
          style={{
            margin: '0 0 8px',
            fontSize: '28px',
            fontWeight: 700,
            color: TITLE_COLOR,
            textAlign: 'center',
          }}
        >
          Create Account
        </h1>
        <p style={{ margin: '0 0 24px', color: '#4b5563', textAlign: 'center' }}>
          Join ELPIS AI
        </p>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} style={{ marginTop: error ? '12px' : 0 }}>
          <div style={{ marginBottom: '14px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                border: `1px solid ${BORDER}`,
                borderRadius: '6px',
                padding: '10px 12px',
                boxSizing: 'border-box',
                fontSize: '15px',
              }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                border: `1px solid ${BORDER}`,
                borderRadius: '6px',
                padding: '10px 12px',
                boxSizing: 'border-box',
                fontSize: '15px',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                border: `1px solid ${BORDER}`,
                borderRadius: '6px',
                padding: '10px 12px',
                boxSizing: 'border-box',
                fontSize: '15px',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: PRIMARY,
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '11px 12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Create Account
          </button>
        </form>

        {loading ? <LoadingSpinner /> : null}

        <p style={{ margin: '20px 0 0', textAlign: 'center', color: '#4b5563' }}>
          <Link
            to={ROUTES.login}
            style={{ color: PRIMARY, textDecoration: 'none', fontWeight: 600 }}
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}
