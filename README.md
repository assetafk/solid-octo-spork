# E-Commerce Application

Современное production-ready e-commerce приложение на React с использованием последних технологий.

## Технологический стек

- **Vite** - современный сборщик
- **React 18+** - UI библиотека
- **React Router v6** - маршрутизация
- **TanStack Query v5** - управление серверным состоянием
- **Zustand** - управление клиентским состоянием
- **Tailwind CSS v3** - стилизация
- **React Hook Form + Zod** - формы и валидация
- **Framer Motion** - анимации
- **i18next** - интернационализация
- **Axios** - HTTP клиент
- **Vite PWA Plugin** - Progressive Web App

## Функциональность

- ✅ Аутентификация (регистрация, вход, выход)
- ✅ Каталог товаров с фильтрацией и поиском
- ✅ Корзина покупок
- ✅ Оформление заказа
- ✅ Профиль пользователя с историей заказов
- ✅ Темная тема
- ✅ Мультиязычность (Русский/English)
- ✅ Адаптивный дизайн
- ✅ PWA поддержка
- ✅ Code splitting для оптимизации

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Просмотр production сборки
npm run preview
```

## Структура проекта

```
src/
├── api/              # API клиент и endpoints
├── components/       # React компоненты
│   ├── common/      # Переиспользуемые UI компоненты
│   ├── layout/      # Layout компоненты
│   ├── product/     # Компоненты товаров
│   └── cart/        # Компоненты корзины
├── hooks/           # Custom React hooks
├── pages/           # Страницы приложения
├── store/           # Zustand stores
├── utils/           # Утилиты
└── styles/          # Глобальные стили
```

## Переменные окружения

Создайте файл `.env` на основе `.env.example`:

```
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
```

## Особенности

- **Code Splitting**: Страницы загружаются лениво для оптимизации
- **Error Boundary**: Обработка ошибок на уровне приложения
- **Responsive Design**: Mobile-first подход
- **PWA**: Работает как нативное приложение
- **Dark Mode**: Поддержка темной темы с сохранением в localStorage
- **i18n**: Полная поддержка мультиязычности

## Лицензия

MIT
