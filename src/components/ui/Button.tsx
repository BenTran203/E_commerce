import React from 'react'
import { ButtonProps } from '@/types'
import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    border-0 rounded-none
  `

  const variants = {
    primary: `
      bg-primary-900 text-white hover:bg-primary-800 
      focus:ring-primary-500 shadow-luxury hover:shadow-luxury-lg
    `,
    secondary: `
      border border-primary-900 text-primary-900 bg-transparent
      hover:bg-primary-900 hover:text-white focus:ring-primary-500
    `,
    ghost: `
      text-primary-700 bg-transparent hover:text-primary-900 hover:bg-primary-50
      focus:ring-primary-500
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700 
      focus:ring-red-500 shadow-luxury hover:shadow-luxury-lg
    `,
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        widthClass,
        className
      )}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button 