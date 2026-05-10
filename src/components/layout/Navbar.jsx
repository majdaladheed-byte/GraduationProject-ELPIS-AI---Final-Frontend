import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'
import { ROUTES } from '../../utils/constants.js'

const barStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #d1e3f8',
}

const brandStyle = {
  color: '#1a1a2e',
  fontWeight: 700,
  fontSize: '18px',
  textDecoration: 'none',
}

const navRightStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}

function navLinkStyle({ isActive }) {
  return {
    color: '#2a7fd4',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: isActive ? 600 : 500,
    borderBottom: isActive ? '2px solid #2a7fd4' : '2px solid transparent',
    paddingBottom: '2px',
  }
}

const logoutButtonStyle = {
  padding: '8px 14px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#2a7fd4',
  backgroundColor: '#ffffff',
  border: '1px solid #2a7fd4',
  borderRadius: '6px',
  cursor: 'pointer',
}

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  return (
    <header style={barStyle}>
      <Link to="/" style={brandStyle}>
        ELPIS AI
      </Link>

      <nav style={navRightStyle} aria-label="Main">
        {token ? (
          <>
            <NavLink to={ROUTES.predict} style={navLinkStyle}>
              Predict
            </NavLink>
            <NavLink to={ROUTES.history} style={navLinkStyle}>
              History
            </NavLink>
            <button type="button" style={logoutButtonStyle} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : null}
      </nav>
    </header>
  )
}
