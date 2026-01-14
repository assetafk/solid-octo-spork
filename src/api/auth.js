import client from './client'

export const authApi = {
  login: async (email, password) => {
    const response = await client.post('/auth/login', { email, password })
    return response.data
  },

  register: async (userData) => {
    const response = await client.post('/auth/register', userData)
    return response.data
  },

  logout: async () => {
    const response = await client.post('/auth/logout')
    return response.data
  },

  getProfile: async () => {
    const response = await client.get('/auth/profile')
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await client.put('/auth/profile', userData)
    return response.data
  },

  refreshToken: async (refreshToken) => {
    const response = await client.post('/auth/refresh', { refreshToken })
    return response.data
  },
}

