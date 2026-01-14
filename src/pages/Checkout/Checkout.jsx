import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '../../hooks/useCart'
import { ordersApi } from '../../api/orders'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import { formatPrice } from '../../utils'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  address: z.string().min(5, 'Адрес должен быть не менее 5 символов'),
  city: z.string().min(2, 'Город должен быть не менее 2 символов'),
  postalCode: z.string().min(5, 'Почтовый индекс должен быть не менее 5 символов'),
  phone: z.string().min(10, 'Телефон должен быть не менее 10 символов'),
  cardNumber: z.string().min(16, 'Номер карты должен быть 16 символов'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Формат: MM/YY'),
  cvv: z.string().min(3, 'CVV должен быть 3 символа'),
})

const Checkout = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  })

  const shipping = 2500
  const tax = total * 0.1
  const finalTotal = total + shipping + tax

  const onSubmit = async (data) => {
    if (items.length === 0) {
      setError('Корзина пуста')
      return
    }

    setLoading(true)
    setError('')

    try {
      await ordersApi.create({
        items,
        shippingInfo: {
          fullName: data.fullName,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          phone: data.phone,
        },
        paymentInfo: {
          cardNumber: data.cardNumber,
          expiryDate: data.expiryDate,
          cvv: data.cvv,
        },
        total: finalTotal,
      })

      clearCart()
      navigate('/profile?order=success')
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка оформления заказа')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <Card className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
            <Button onClick={() => navigate('/products')}>
              {t('common.products')}
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          {t('checkout.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Shipping Info */}
              <Card>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {t('checkout.shippingInfo')}
                </h2>
                <div className="space-y-4">
                  <Input
                    label={t('checkout.fullName')}
                    name="fullName"
                    register={register}
                    error={errors.fullName?.message}
                    required
                  />
                  <Input
                    label={t('checkout.address')}
                    name="address"
                    register={register}
                    error={errors.address?.message}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={t('checkout.city')}
                      name="city"
                      register={register}
                      error={errors.city?.message}
                      required
                    />
                    <Input
                      label={t('checkout.postalCode')}
                      name="postalCode"
                      register={register}
                      error={errors.postalCode?.message}
                      required
                    />
                  </div>
                  <Input
                    label={t('checkout.phone')}
                    name="phone"
                    type="tel"
                    register={register}
                    error={errors.phone?.message}
                    required
                  />
                </div>
              </Card>

              {/* Payment Info */}
              <Card>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {t('checkout.paymentMethod')}
                </h2>
                <div className="space-y-4">
                  <Input
                    label={t('checkout.cardNumber')}
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    register={register}
                    error={errors.cardNumber?.message}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={t('checkout.expiryDate')}
                      name="expiryDate"
                      placeholder="MM/YY"
                      register={register}
                      error={errors.expiryDate?.message}
                      required
                    />
                    <Input
                      label={t('checkout.cvv')}
                      name="cvv"
                      type="password"
                      register={register}
                      error={errors.cvv?.message}
                      required
                    />
                  </div>
                </div>
              </Card>

              {error && (
                <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loading size="sm" /> : t('checkout.placeOrder')}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t('checkout.orderSummary')}
              </h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name} x {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('cart.subtotal')}
                    </span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('cart.shipping')}
                    </span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('cart.tax')}
                    </span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>{t('common.total')}</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

