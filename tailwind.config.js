/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        health: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        glucose: {
          low: '#3b82f6',
          normal: '#10b981',
          prediabetic: '#f59e0b',
          high: '#ef4444',
        },
        liver: {
          healthy: '#10b981',
          warning: '#f59e0b',
          elevated: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(13, 148, 136, 0.12)',
        'card-glow': '0 4px 20px -2px rgba(20, 184, 166, 0.15)',
      }
    },
  },
  plugins: [],
}
