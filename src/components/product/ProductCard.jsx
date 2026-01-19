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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <Card hover className="h-full flex flex-col overflow-hidden">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 mb-5 -m-6 mb-5">
            <img
              src={product.image || 'https://via.placeholder.com/300'}
              alt={product.name}
              className="h-64 w-full object-cover object-center transition-smooth group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="flex-1 flex flex-col px-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 flex-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(product.price)}
              </span>
              {product.inStock ? (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  {t('products.inStock')}
                </span>
              ) : (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                  {t('products.outOfStock')}
                </span>
              )}
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {t('common.addToCart')}
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default ProductCard

