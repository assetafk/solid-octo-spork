const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  className = '',
  register,
  ...props
}) => {
  const inputProps = register
    ? register(name)
    : {
        name,
        value,
        onChange,
        onBlur,
      }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-soft-700 dark:text-soft-300 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all ${
          error
            ? 'border-red-300 dark:border-red-500'
            : 'border-soft-200 dark:border-soft-700'
        } bg-white dark:bg-soft-800 text-soft-800 dark:text-soft-100 placeholder-soft-400`}
        {...inputProps}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}

export default Input

