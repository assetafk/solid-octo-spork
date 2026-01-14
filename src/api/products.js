import client from './client'
import { mockProducts, mockCategories } from '../data/mockProducts'

// Флаг для использования моковых данных (когда нет бэкенда)
const USE_MOCK_DATA = true

export const productsApi = {
  getAll: async (params = {}) => {
    if (USE_MOCK_DATA) {
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 300))
      
      let products = [...mockProducts]
      
      // Фильтрация по категории
      if (params.category && params.category !== '') {
        products = products.filter(p => p.category === params.category)
      }
      
      // Сортировка
      if (params.sortBy) {
        switch (params.sortBy) {
          case 'price-asc':
            products.sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            products.sort((a, b) => b.price - a.price)
            break
          case 'name':
          default:
            products.sort((a, b) => a.name.localeCompare(b.name))
            break
        }
      }
      
      return products
    }
    
    try {
      const response = await client.get('/products', { params })
      return response.data
    } catch (error) {
      // Fallback на моковые данные при ошибке
      console.warn('API error, using mock data:', error)
      return mockProducts
    }
  },

  getById: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200))
      const product = mockProducts.find(p => p.id === id)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    }
    
    try {
      const response = await client.get(`/products/${id}`)
      return response.data
    } catch (error) {
      // Fallback на моковые данные при ошибке
      const product = mockProducts.find(p => p.id === id)
      if (product) {
        return product
      }
      throw error
    }
  },

  getCategories: async () => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 100))
      return mockCategories
    }
    
    try {
      const response = await client.get('/products/categories')
      return response.data
    } catch (error) {
      // Fallback на моковые данные при ошибке
      return mockCategories
    }
  },

  search: async (query, params = {}) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const searchLower = query.toLowerCase()
      const filtered = mockProducts.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower)
      )
      
      return filtered
    }
    
    try {
      const response = await client.get('/products/search', {
        params: { q: query, ...params },
      })
      return response.data
    } catch (error) {
      // Fallback на моковые данные при ошибке
      const searchLower = query.toLowerCase()
      return mockProducts.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      )
    }
  },
}

