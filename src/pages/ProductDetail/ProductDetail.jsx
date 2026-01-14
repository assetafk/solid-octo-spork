import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../../api/products'
import { useCart } from '../../hooks/useCart'
import Loading from '../../components/common/Loading'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import { formatPrice } from '../../utils'
import { useState } from 'react'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
  })

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    navigate('/cart')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <Button onClick={() => navigate('/products')}>Вернуться к каталогу</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <img
              src={product.image || 'https://via.placeholder.com/600'}
              alt={product.name}
              className="w-full h-auto rounded-2xl shadow-soft"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600?text=No+Image'
                e.target.onerror = null
              }}
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                Артикул: <span className="font-mono">{product.sku}</span>
              </p>
            )}
            {product.brand && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Бренд: <span className="font-semibold">{product.brand}</span>
              </p>
            )}
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>
            
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Характеристики:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.inStock ? (
              <div className="mb-6">
                <p className="text-green-600 dark:text-green-400 mb-4">
                  {t('products.inStock')}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <label className="text-gray-700 dark:text-gray-300">
                    {t('products.quantity')}:
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button variant="primary" size="lg" onClick={handleAddToCart}>
                    {t('common.addToCart')}
                  </Button>
                  <Button variant="outline" size="lg">
                    {t('common.buyNow')}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-red-600 dark:text-red-400 mb-6">
                {t('products.outOfStock')}
              </p>
            )}

            {product.category && (
              <Card className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">{t('products.category')}:</span>{' '}
                  {product.category}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

