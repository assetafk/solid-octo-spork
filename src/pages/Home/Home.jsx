import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Добро пожаловать в наш магазин
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Откройте для себя лучшие товары по выгодным ценам
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary">
                {t('common.products')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Быстрая доставка',
                description: 'Доставляем заказы в кратчайшие сроки',
                icon: '🚚',
              },
              {
                title: 'Качественные товары',
                description: 'Только проверенные поставщики',
                icon: '✅',
              },
              {
                title: 'Лучшие цены',
                description: 'Конкурентные цены на все товары',
                icon: '💰',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

