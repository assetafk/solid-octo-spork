import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../../api/products'
import ProductCard from '../../components/product/ProductCard'
import Loading from '../../components/common/Loading'
import Input from '../../components/common/Input'
import { debounce } from '../../utils'

const Products = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', category, sortBy],
    queryFn: () => productsApi.getAll({ category, sortBy }),
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productsApi.getCategories(),
  })

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 300),
    []
  )

  const filteredProducts = useMemo(() => {
    if (!products) return []
    let filtered = products

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    return filtered
  }, [products, search])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          {t('products.title')}
        </h1>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:flex md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              placeholder={t('common.search')}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">{t('products.allCategories')}</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="name">{t('products.sort')}: Имя</option>
              <option value="price-asc">{t('products.sort')}: {t('common.price')} ↑</option>
              <option value="price-desc">{t('products.sort')}: {t('common.price')} ↓</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('products.noProducts')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

