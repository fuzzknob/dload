import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import { VscLoading } from 'react-icons/vsc'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: 'default' | 'blue'
  shape?: 'normal' | 'square'
  loading?: boolean
}

const schemeStyles = {
  default:
    'bg-secondary hover:bg-tertiary dark:bg-secondary-dark dark:hover:bg-tertiary-dark text-primary-text dark:text-primary-text-dark',
  blue: 'bg-blue hover:bg-blue-highlight text-white',
}

const Button: React.FC<ButtonProps> = ({
  children,
  scheme,
  shape,
  className,
  loading,
  disabled,
  ...props
}) => {
  const padding = shape === 'square' ? 'p-2' : 'px-4 py-2'
  const colors = schemeStyles[scheme || 'default']
  return (
    <button
      disabled={disabled || loading}
      className={classNames(
        colors,
        padding,
        className,
        'relative rounded-md disabled:opacity-60 flex justify-center',
      )}
      {...props}
    >
      {loading ? (
        <div className="position-center">
          <VscLoading role="loader" className="animate-spin" />
        </div>
      ) : null}
      <span className={classNames({ invisible: loading }, 'text-base')}>
        {children}
      </span>
    </button>
  )
}

export default Button
