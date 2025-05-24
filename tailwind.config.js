/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        'deep-charcoal': '#0A0A0A',
        'off-white': '#F5F5F5',
        'light-gray': '#E0E0E0',
        'mid-gray': '#333333',
        'dark-gray': '#1A1A1A',
        'accent-purple': '#8E2DE2', // Example accent
        'accent-cyan': '#4EE7E9',  // Example accent
        'neon-green': '#39FF14', // Subtle neon for highlights
        'neon-pink': '#FF00A0', // Subtle neon for highlights
        'neon-blue': '#00BFFF', // Subtle neon for highlights
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'd-xs': ['0.75rem', { lineHeight: '1rem' }],    // desktop extra small
        'd-sm': ['0.875rem', { lineHeight: '1.25rem' }], // desktop small
        'd-base': ['1rem', { lineHeight: '1.5rem' }],   // desktop base
        'd-lg': ['1.125rem', { lineHeight: '1.75rem' }], // desktop large
        'd-xl': ['1.25rem', { lineHeight: '1.75rem' }],  // desktop xl
        'd-2xl': ['1.5rem', { lineHeight: '2rem' }],    // desktop 2xl
        'd-3xl': ['1.875rem', { lineHeight: '2.25rem' }], // desktop 3xl
        'd-4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // desktop 4xl
        'd-5xl': ['3rem', { lineHeight: '1' }],        // desktop 5xl
        'd-6xl': ['3.75rem', { lineHeight: '1' }],       // desktop 6xl
        'd-7xl': ['4.5rem', { lineHeight: '1' }],        // desktop 7xl
        'd-8xl': ['6rem', { lineHeight: '1' }],          // desktop 8xl
        'd-9xl': ['8rem', { lineHeight: '1' }],          // desktop 9xl
        'd-10xl': ['10rem', { lineHeight: '1' }],        // desktop 10xl (approx 160px)
        'd-11xl': ['12rem', { lineHeight: '1' }],        // desktop 11xl (approx 192px)
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
        '34': '8.5rem', // 136px
        '38': '9.5rem', // 152px
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'soft-glow': '0 0px 15px rgba(142, 45, 226, 0.3), 0 0px 30px rgba(78, 231, 233, 0.2)', // Neo-morphism subtle glow
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.6), inset 0 -2px 4px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.86, 0, 0.07, 1)',
      }
    },
  },
  plugins: [],
}