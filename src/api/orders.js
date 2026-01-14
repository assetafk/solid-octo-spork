import client from './client'

export const ordersApi = {
  create: async (orderData) => {
    const response = await client.post('/orders', orderData)
    return response.data
  },

  getAll: async () => {
    const response = await client.get('/orders')
    return response.data
  },

  getById: async (id) => {
    const response = await client.get(`/orders/${id}`)
    return response.data
  },

  updateStatus: async (id, status) => {
    const response = await client.patch(`/orders/${id}/status`, { status })
    return response.data
  },
}

