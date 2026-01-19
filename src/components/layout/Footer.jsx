import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-gray-100 text-xl font-bold mb-4">E-Commerce</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Современный интернет-магазин с лучшими товарами и сервисом.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-gray-100 font-semibold mb-6 text-sm uppercase tracking-wider">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
                  {t('common.products')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-gray-100 font-semibold mb-6 text-sm uppercase tracking-wider">Поддержка</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
                  Доставка
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
                  Возврат
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-gray-100 font-semibold mb-6 text-sm uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 dark:text-gray-400">info@ecommerce.com</li>
              <li className="text-sm text-gray-600 dark:text-gray-400">+7 (999) 123-45-67</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">&copy; {new Date().getFullYear()} E-Commerce. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

