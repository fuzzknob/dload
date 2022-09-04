import React from 'react'
import classNames from 'classnames'

import { Color } from './types'

interface ContainerProps {
  color?: Color
  className?: string
  rounded?: boolean
  children: React.ReactNode
}

const COLOR: Record<Color, string> = {
  primary: 'bg-primary dark:bg-primary-dark',
  secondary: 'bg-secondary dark:bg-secondary-dark',
  tertiary: 'bg-tertiary dark:bg-tertiary-dark',
  blue: 'bg-blue',
  dark: 'bg-dark',
  white: 'bg-white',
}

const Container: React.FC<ContainerProps> = ({
  children,
  color,
  rounded,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        COLOR[color || 'primary'],
        { 'rounded-lg': rounded },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
