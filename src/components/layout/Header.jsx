import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { useTheme } from '../../hooks/useTheme'
import Button from '../common/Button'
import { useState } from 'react'

const Header = () => {
  const { t, i18n } = useTranslation()
  const { isAuthenticated, user, logout } = useAuth()
  const { itemCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  return (
    <header className="bg-white/80 dark:bg-soft-800/80 backdrop-blur-md shadow-soft sticky top-0 z-30 border-b border-soft-100 dark:border-soft-700">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-semibold text-primary-500 dark:text-primary-400 tracking-tight">
            E-Commerce
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              {t('common.home')}
            </Link>
            <Link
              to="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              {t('common.products')}
            </Link>
            {isAuthenticated && (
              <Link
                to="/profile"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
              >
                {t('common.profile')}
              </Link>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center space-x-1 bg-soft-100 dark:bg-soft-800 rounded-xl p-1">
              <button
                onClick={() => changeLanguage('ru')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  i18n.language === 'ru'
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-soft-600 dark:text-soft-400 hover:text-soft-800 dark:hover:text-soft-200'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  i18n.language === 'en'
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-soft-600 dark:text-soft-400 hover:text-soft-800 dark:hover:text-soft-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl hover:bg-soft-100 dark:hover:bg-soft-700 transition-all duration-300 group"
              aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
              title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
            >
              <div className="relative w-6 h-6">
                {/* Sun icon (light mode) */}
                <svg
                  className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 ${
                    theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* Moon icon (dark mode) */}
                <svg
                  className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 ${
                    theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </div>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl hover:bg-soft-100 dark:hover:bg-soft-700 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-400 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user?.name || user?.email}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  {t('common.logout')}
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  {t('common.login')}
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  {t('common.register')}
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2.5 rounded-xl hover:bg-soft-100 dark:hover:bg-soft-700 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-soft-200 dark:border-soft-700">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 text-soft-700 dark:text-soft-300 hover:bg-soft-100 dark:hover:bg-soft-700 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('common.home')}
              </Link>
              <Link
                to="/products"
                className="px-4 py-2 text-soft-700 dark:text-soft-300 hover:bg-soft-100 dark:hover:bg-soft-700 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('common.products')}
              </Link>
              
              {/* Mobile theme toggle */}
              <button
                onClick={toggleTheme}
                className="px-4 py-2 text-left text-soft-700 dark:text-soft-300 hover:bg-soft-100 dark:hover:bg-soft-700 rounded-xl transition-colors flex items-center space-x-2"
              >
                <div className="relative w-5 h-5">
                  <svg
                    className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                      theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
                      theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
                <span>{theme === 'dark' ? t('common.darkMode') : t('common.lightMode')}</span>
              </button>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-soft-700 dark:text-soft-300 hover:bg-soft-100 dark:hover:bg-soft-700 rounded-xl transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('common.profile')}
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 text-left text-soft-700 dark:text-soft-300 hover:bg-soft-100 dark:hover:bg-soft-700 rounded-xl transition-colors"
                  >
                    {t('common.logout')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/login')
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 text-left text-soft-700 dark:text-soft-300 hover:bg-soft-100 dark:hover:bg-soft-700 rounded-xl transition-colors"
                  >
                    {t('common.login')}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register')
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 text-left text-soft-700 dark:text-soft-300 hover:bg-soft-100 dark:hover:bg-soft-700 rounded-xl transition-colors"
                  >
                    {t('common.register')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

