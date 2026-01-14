import client from './client'

export const cartApi = {
  get: async () => {
    const response = await client.get('/cart')
    return response.data
  },

  addItem: async (productId, quantity = 1) => {
    const response = await client.post('/cart/items', { productId, quantity })
    return response.data
  },

  updateItem: async (itemId, quantity) => {
    const response = await client.patch(`/cart/items/${itemId}`, { quantity })
    return response.data
  },

  removeItem: async (itemId) => {
    const response = await client.delete(`/cart/items/${itemId}`)
    return response.data
  },

  clear: async () => {
    const response = await client.delete('/cart')
    return response.data
  },
}

