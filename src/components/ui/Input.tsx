import React, { forwardRef } from 'react'
import { InputProps } from '@/types'
import { cn } from '@/utils'

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = 'text',
      value,
      defaultValue,
      onChange,
      error,
      disabled = false,
      required = false,
      className,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-primary-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={cn(
            `w-full px-4 py-3 border rounded-none transition-colors duration-200
             bg-white text-primary-900 placeholder-primary-400
             focus:outline-none focus:ring-2 focus:ring-offset-0
             disabled:bg-primary-50 disabled:cursor-not-allowed`,
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-primary-300 focus:border-primary-500 focus:ring-primary-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input 