import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../common/Card'
import Button from '../common/Button'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils'

const ProductCard = ({ product }) => {
  const { t } = useTranslation()
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card hover className="h-full flex flex-col">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-2xl bg-soft-100 dark:bg-soft-800 mb-4">
            <img
              src={product.image || 'https://via.placeholder.com/300'}
              alt={product.name}
              className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300?text=No+Image'
                e.target.onerror = null
              }}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
              {product.name}
            </h3>
            {product.sku && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                Артикул: {product.sku}
              </p>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-primary-500 dark:text-primary-400">
                {formatPrice(product.price)}
              </span>
              {product.inStock ? (
                <span className="text-sm text-green-500 dark:text-green-400 font-medium">
                  {t('products.inStock')}
                </span>
              ) : (
                <span className="text-sm text-red-400 dark:text-red-400 font-medium">
                  {t('products.outOfStock')}
                </span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {t('common.addToCart')}
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default ProductCard

