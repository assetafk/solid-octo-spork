import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/auth'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, setAuth, logout: storeLogout, setUser } = useAuthStore()

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password)
      setAuth(response.user, response.token)
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken)
      }
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData)
      setAuth(response.user, response.token)
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken)
      }
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      storeLogout()
      navigate('/')
    }
  }

  const updateProfile = async (userData) => {
    try {
      const response = await authApi.updateProfile(userData)
      setUser(response.user)
      return response
    } catch (error) {
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  }
}

