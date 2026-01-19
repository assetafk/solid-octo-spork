import { useTranslation } from 'react-i18next'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils'
import Button from '../common/Button'

const CartItem = ({ item }) => {
  const { t } = useTranslation()
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center space-x-5 p-6">
      <img
        src={item.image || 'https://via.placeholder.com/100'}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl bg-gray-100 dark:bg-gray-800"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {formatPrice(item.price)} x {item.quantity}
        </p>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center transition-smooth text-gray-600 dark:text-gray-400"
          >
            -
          </button>
          <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center transition-smooth text-gray-600 dark:text-gray-400"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
          {formatPrice(item.price * item.quantity)}
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={() => removeItem(item.id)}
        >
          {t('cart.remove')}
        </Button>
      </div>
    </div>
  )
}

export default CartItem

