/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#e8eaf2',
          100: '#c5cadf',
          200: '#9ea8ca',
          300: '#7786b5',
          400: '#596da6',
          500: '#3c5497',
          600: '#364c8f',
          700: '#2e4284',
          800: '#26397a',
          900: '#192869',
          950: '#0d1635',
        },
        electric: {
          300: '#67d7ff',
          400: '#22c7f5',
          500: '#00b4e6',
          600: '#0099cc',
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out both',
        'slide-up':   'slideUp 0.5s ease-out both',
        'slide-in-right': 'slideInRight 0.35s ease-out both',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer':    'shimmer 1.6s linear infinite',
      },
      keyframes: {
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:      { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseSoft:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '.6' } },
        shimmer:      { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
