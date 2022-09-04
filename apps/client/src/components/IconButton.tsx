import React from 'react'
import classNames from 'classnames'

interface IconButtonProps {
  children: React.ReactNode
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({ children, className }) => {
  return (
    <button
      type="button"
      className={classNames(
        'text-secondary-text hover:text-primary-text dark:text-secondary-text-dark dark:hover:text-primary-text-dark',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default IconButton
