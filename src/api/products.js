import client from './client'

export const productsApi = {
  getAll: async (params = {}) => {
    const response = await client.get('/products', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await client.get(`/products/${id}`)
    return response.data
  },

  getCategories: async () => {
    const response = await client.get('/products/categories')
    return response.data
  },

  search: async (query, params = {}) => {
    const response = await client.get('/products/search', {
      params: { q: query, ...params },
    })
    return response.data
  },
}

