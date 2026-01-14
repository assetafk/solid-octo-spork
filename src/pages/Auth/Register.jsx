import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../hooks/useAuth'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
    email: z.string().email('Неверный email'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

const Register = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          {t('auth.registerTitle')}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={t('auth.name')}
            type="text"
            name="name"
            register={register}
            error={errors.name?.message}
            required
          />
          <Input
            label={t('auth.email')}
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
            required
          />
          <Input
            label={t('auth.password')}
            type="password"
            name="password"
            register={register}
            error={errors.password?.message}
            required
          />
          <Input
            label={t('auth.confirmPassword')}
            type="password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword?.message}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loading size="sm" /> : t('common.register')}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link
            to="/login"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            {t('common.login')}
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default Register

