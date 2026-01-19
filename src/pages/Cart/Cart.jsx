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
      <div className="min-h-screen py-12 md:py-16">
        <div className="container-custom">
          <Card className="text-center py-16 md:py-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {t('cart.empty')}
            </h2>
            <Link to="/products">
              <Button variant="primary" size="lg">
                {t('common.products')}
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const shipping = 500
  const tax = total * 0.1
  const finalTotal = total + shipping + tax

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          {t('cart.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <Button variant="danger" onClick={clearCart}>
                  {t('common.delete')} все
                </Button>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                {t('checkout.orderSummary')}
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('cart.subtotal')}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('cart.shipping')}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('cart.tax')}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
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
                size="lg"
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

