import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../hooks/useAuth'
import { ordersApi } from '../../api/orders'
import Card from '../../components/common/Card'
import Loading from '../../components/common/Loading'
import { formatPrice, formatDate } from '../../utils'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const Profile = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const orderSuccess = searchParams.get('order') === 'success'

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getAll(),
    enabled: !!user,
  })

  useEffect(() => {
    if (orderSuccess) {
      alert(t('checkout.orderPlaced'))
    }
  }, [orderSuccess, t])

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
          {t('profile.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info */}
          <div>
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Информация
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Имя:</span> {user?.name || 'Не указано'}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user?.email || 'Не указано'}
                </p>
              </div>
            </Card>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t('profile.orderHistory')}
              </h2>
              {!orders || orders.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  {t('profile.noOrders')}
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            Заказ #{order.id}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary-600 dark:text-primary-400">
                            {formatPrice(order.total)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items?.length || 0} товаров
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

