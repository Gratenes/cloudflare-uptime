/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.tsx',
    './**/*.ts',
    './**/*.js',
    './**/*.jsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      ringWidth: {
        DEFAULT: 'var(--theme-rounded-base)',
      },
      borderRadius: {
        DEFAULT: 'var(--theme-rounded-base)',
        'token': 'var(--theme-rounded-base)',
      },
      colors: {
        'background': 'rgb(var(--color-background))',
        'primary': 'rgb(var(--color-primary))',
        'secondary': 'rgb(var(--color-secondary))',
        'tertiary': 'rgb(var(--color-tertiary))',
        'success': 'rgb(var(--color-success))',
        'warning': 'rgb(var(--color-warning))',
        'error': 'rgb(var(--color-error))',
      },
      textColor: {
        'normal': 'rgb(var(--color-text))',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

