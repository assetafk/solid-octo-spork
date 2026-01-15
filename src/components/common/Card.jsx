import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${
        hover ? 'hover:shadow-lg transition-shadow' : ''
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card

