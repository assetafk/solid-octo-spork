import { useTranslation } from 'react-i18next'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils'
import Button from '../common/Button'

const CartItem = ({ item }) => {
  const { t } = useTranslation()
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
      <img
        src={item.image || 'https://via.placeholder.com/100'}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/100?text=No+Image'
          e.target.onerror = null
        }}
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatPrice(item.price)} x {item.quantity}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900 dark:text-gray-100">
          {formatPrice(item.price * item.quantity)}
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="mt-2"
        >
          {t('cart.remove')}
        </Button>
      </div>
    </div>
  )
}

export default CartItem

