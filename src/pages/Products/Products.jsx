import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../../api/products'
import { mockProducts, mockCategories } from '../../data/mockProducts'
import ProductCard from '../../components/product/ProductCard'
import Loading from '../../components/common/Loading'
import Input from '../../components/common/Input'
import { debounce } from '../../utils'

const Products = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products', category, sortBy],
    queryFn: () => productsApi.getAll({ category, sortBy }),
    retry: false, // Не повторять запрос при ошибке
  })

  const { data: categories, isError: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productsApi.getCategories(),
    retry: false,
  })

  // Используем mock данные если API не работает
  const productsData = isError ? mockProducts : (products || [])
  const categoriesData = categoriesError ? mockCategories : (categories || [])

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 300),
    []
  )

  const filteredProducts = useMemo(() => {
    if (!productsData || productsData.length === 0) return []
    let filtered = productsData

    // Фильтрация по категории (если не используется API)
    if (category && isError) {
      filtered = filtered.filter(
        (product) => product.category === category
      )
    }

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Сортировка (если не используется API)
    if (isError) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'name':
          default:
            return a.name.localeCompare(b.name)
        }
      })
    }

    return filtered
  }, [productsData, search, category, sortBy, isError])

  if (isLoading && !isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          {t('products.title')}
        </h1>

        {/* Filters and Search */}
        <div className="mb-12 space-y-4 md:flex md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              name="search"
              placeholder={t('common.search')}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <div className="md:w-56">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-smooth text-sm"
            >
              <option value="">{t('products.allCategories')}</option>
              {categoriesData?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-56">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-smooth text-sm"
            >
              <option value="name">{t('products.sort')}: Имя</option>
              <option value="price-asc">{t('products.sort')}: {t('common.price')} ↑</option>
              <option value="price-desc">{t('products.sort')}: {t('common.price')} ↓</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t('products.noProducts')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

