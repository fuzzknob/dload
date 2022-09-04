/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{tsx,html}'],
  darkMode: 'class',
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      primary: {
        DEFAULT: '#FFFFFF',
        dark: '#303030',
      },
      secondary: {
        DEFAULT: '#F5F5F5',
        dark: '#3f3f3f',
      },
      tertiary: {
        DEFAULT: '#EAEAEA',
        dark: '#4C5052',
      },
      blue: {
        DEFAULT: '#2661D8',
        highlight: '#376BD3',
      },
      'primary-text': {
        DEFAULT: '#333232',
        dark: '#FFFFFF',
      },
      'secondary-text': {
        DEFAULT: '#666666',
        dark: '#D8D8D8',
      },
      'tertiary-text': {
        DEFAULT: '#A5A5A5',
        dark: '#A5A5A5',
      },
    },
    fontSize: {
      ...defaultTheme.fontSize,
      mega: '105px',
      '2xl': '35px',
      xl: '25px',
      lg: '20px',
      base: '16px',
      sm: '14px',
      xs: '12px'
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}

