import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { login, refreshToken, fetchProfile } from '../api/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setIsAuthenticated(true)
      fetchProfile()
        .then((profile) => {
          setUser(profile)
        })
        .catch(() => {
          // Token might be expired, try refresh
          const refresh = localStorage.getItem('refresh_token')
          if (refresh) {
            return refreshToken({ refresh })
              .then((data) => {
                localStorage.setItem('access_token', data.access)
                return fetchProfile()
              })
              .then((profile) => {
                setUser(profile)
              })
              .catch(() => {
                logout()
              })
          } else {
            logout()
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = useCallback(async (email, password) => {
    const data = await login({ email, password })
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    setUser(data.user)
    setIsAuthenticated(true)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated,
    login: handleLogin,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}