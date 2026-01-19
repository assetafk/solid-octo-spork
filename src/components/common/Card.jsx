import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-900 rounded-2xl minimal-shadow border border-gray-100 dark:border-gray-800 p-6 ${
        hover ? 'hover:minimal-shadow-lg transition-smooth cursor-pointer' : ''
      } ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={hover ? { y: -2 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card

