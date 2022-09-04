import React from 'react'
import classNames from 'classnames'

import Text from '@/components/Text'

interface InputProps {
  value: string
  setValue: (value: string) => void
  type?: 'input' | 'textarea'
  label?: string
  className?: string
  placeholder?: string
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  setValue,
  label,
  className,
  ...rest
}) => {
  const defaultClass =
    'w-full outline-none px-3 py-2 text-primary-text dark:text-primary-text-dark bg-secondary dark:bg-secondary-dark placeholder:text-tertiary-text placeholder:font-light rounded-md'
  const inputId = label ? label.toLowerCase().split(' ').join('-') : undefined
  return (
    <div className="mb-4">
      {label && (
        <div className="mb-2">
          <label htmlFor={inputId}>
            <Text>{label}</Text>
          </label>
        </div>
      )}
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          className={classNames(defaultClass, 'resize-none', className)}
          {...rest}
        ></textarea>
      ) : (
        <input
          id={inputId}
          className={classNames(defaultClass, className)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...rest}
        />
      )}
    </div>
  )
}

export default Input
