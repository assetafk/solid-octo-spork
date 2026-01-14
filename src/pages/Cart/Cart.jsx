import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import CartItem from '../../components/cart/CartItem'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { formatPrice } from '../../utils'

const Cart = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <Card className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {t('cart.empty')}
            </h2>
            <Link to="/products">
              <Button variant="primary">{t('common.products')}</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const shipping = 2500
  const tax = total * 0.1
  const finalTotal = total + shipping + tax

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          {t('cart.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button variant="danger" onClick={clearCart}>
                  {t('common.delete')} все
                </Button>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t('checkout.orderSummary')}
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('cart.subtotal')}
                  </span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('cart.shipping')}
                  </span>
                  <span className="font-semibold">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('cart.tax')}
                  </span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {t('common.total')}
                    </span>
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                {t('common.checkout')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

