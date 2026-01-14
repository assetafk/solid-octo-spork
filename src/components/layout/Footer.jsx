import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">E-Commerce</h3>
            <p className="text-sm">
              Современный интернет-магазин с лучшими товарами и сервисом.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">
                  {t('common.products')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Доставка
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Возврат
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <p className="text-sm">Email: info@ecommerce.com</p>
            <p className="text-sm">Телефон: +7 (999) 123-45-67</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} E-Commerce. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

