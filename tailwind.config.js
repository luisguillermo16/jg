/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotateWave: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(180deg)' },
          '100%': { transform: 'scale(1) rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'rotate-wave': 'rotateWave 25s linear infinite',
        'fade-in': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'slide-up': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s forwards',
        'slide-up-delayed': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) 0.4s forwards',
        'fade-in-delayed': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) 0.6s forwards',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'], /* User said Archivo wasn't it, so using Inter 900 */
      },
      colors: {
        bg: '#030712', /* Dark blue/black tone */
        accent: '#7FFF00', /* Alien Lime - More vibrant and consistent with the new theme */
        text: '#94a3b8',
        'text-h': '#f8fafc',
        'accent-bg': 'rgba(163, 255, 0, 0.1)',
        'accent-border': 'rgba(163, 255, 0, 0.4)',
        'dark-blue': '#0a0f1d',
      },
    },
  },
  plugins: [],
}

