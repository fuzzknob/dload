import React from 'react'
import classNames from 'classnames'

import { FontSize, Color } from './types'

const WEIGHTS = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}

const FONT_SIZE = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  mega: 'text-mega',
}

const COLOR = {
  primary: 'text-primary-text dark:text-primary-text-dark',
  secondary: 'text-secondary-text dark:text-secondary-text-dark',
  tertiary: 'text-tertiary-text dark:text-tertiary-text-dark',
  blue: 'text-blue-text',
  white: 'text-white-text',
  dark: 'text-dark-text',
}

export type TypographyWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'

interface TextProps {
  children: React.ReactNode
  size?: FontSize
  color?: Color
  className?: string
  weight?: TypographyWeight
  italic?: boolean
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  color,
  size,
  weight,
  italic,
}) => {
  return (
    <div
      className={classNames(
        FONT_SIZE[size || 'base'],
        WEIGHTS[weight || 'normal'],
        COLOR[color || 'primary'],
        { italic },
        className,
        'inline',
      )}
    >
      {children}
    </div>
  )
}

export default Text
