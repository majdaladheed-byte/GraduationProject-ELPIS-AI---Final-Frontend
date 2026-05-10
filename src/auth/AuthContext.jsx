import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, removeToken, saveToken } from './token'

const USER_KEY = 'user'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedToken = getToken()
    const savedUser = localStorage.getItem(USER_KEY)

    if (savedToken) {
      setToken(savedToken)
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem(USER_KEY)
      }
    }
  }, [])

  const login = (data) => {
    const nextToken = data?.access_token ?? null
    const nextUser = {
      username: data?.username ?? null,
      user_id: data?.user_id ?? null,
    }

    if (nextToken) {
      saveToken(nextToken)
      setToken(nextToken)
    }

    setUser(nextUser)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
  }

  const logout = () => {
    removeToken()
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

