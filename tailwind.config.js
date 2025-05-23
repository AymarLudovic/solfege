/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-deep': '#0A0A0A',
        'light-contrast': '#F0F0F0',
        'accent-purple': '#8B5CF6', // Purple-neon like
        'accent-cyan': '#00FFE8', // Cyan-neon like
        'accent-pink': '#FF0077', // Pink-neon like
      },
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        spacegrotesk: ['Space Grotesk', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': 'clamp(5rem, 12vw, 12rem)', // For dramatic headings
        'heading-lg': 'clamp(3rem, 8vw, 8rem)',
        'heading-md': 'clamp(2.5rem, 6vw, 6rem)',
        'hero-text-sm': 'clamp(1rem, 2.5vw, 1.5rem)',
      },
      spacing: {
        '1/10': '10%',
        '1/8': '12.5%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '9/10': '90%',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'dash': {
          'to': { 'stroke-dashoffset': '0' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'dash': 'dash 1s linear forwards',
      },
    },
  },
  plugins: [],
}