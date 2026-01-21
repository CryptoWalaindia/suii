/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F0F0FF', // Lighter shade for gradients
          100: '#E0E0FF',
          200: '#C2C2FF',
          300: '#A3A3FF',
          400: '#9E7FFF', // Original primary
          500: '#9E7FFF', // Original primary
          600: '#8C6FFF',
          700: '#7A5FFF',
          800: '#684FFF',
          900: '#563FFF',
        },
        secondary: {
          50: '#E0F7FA', // Lighter shade for gradients
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',
          400: '#26C6DA',
          500: '#38bdf8', // Original secondary
          600: '#00ACC1',
          700: '#0097A7',
          800: '#00838F',
          900: '#006064',
        },
        accent: {
          50: '#FCE4EC',
          100: '#F8BBD0',
          200: '#F48FB1',
          300: '#F06292',
          400: '#EC407A',
          500: '#f472b6', // Original accent
          600: '#D81B60',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
        background: '#F8F8F8', // Adjusted for light theme
        surface: '#FFFFFF',    // Adjusted for light theme
        text: '#333333',       // Adjusted for light theme
        textSecondary: '#666666', // Adjusted for light theme
        border: '#E0E0E0',     // Adjusted for light theme
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
