/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EF', // Base Morning Light background
          200: '#F4ECE0',
          300: '#ECE0CE',
          400: '#DFCDAE',
        },
        parchment: {
          light: '#F8F4EC',
          DEFAULT: '#F3EDE2',
          dark: '#EAE1D2',
        },
        resonance: {
          50: '#FDF9F0',
          100: '#FBF3DF',
          200: '#F5E4B9',
          300: '#ECD08D',
          400: '#E2BD63',
          500: '#D4A857', // Primary warm gold / amber resonance
          600: '#B88B3E',
          700: '#946B2E',
          800: '#755227',
          900: '#5F4222',
        },
        ambient: {
          50: '#F6F6F8',
          100: '#EDEEF2',
          200: '#DCDFE6',
          300: '#BFC3D0',
          400: '#A4A8B9',
          500: '#8B8FA3', // Secondary muted dusty lavender/sage
          600: '#707487',
          700: '#585B6B',
          800: '#434652',
          900: '#32343E',
        },
        ink: {
          900: '#23201C', // High contrast readable dark charcoal
          800: '#332F2A',
          700: '#4A443D',
          600: '#675F56',
          500: '#8A8175',
          400: '#B0A79B',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'light-soft': '0 4px 20px -2px rgba(212, 168, 87, 0.08), 0 2px 8px -1px rgba(60, 50, 40, 0.04)',
        'light-glow': '0 0 35px rgba(212, 168, 87, 0.22), 0 0 12px rgba(212, 168, 87, 0.15)',
        'parchment-elevated': '0 12px 36px -4px rgba(45, 40, 32, 0.08), 0 4px 14px -2px rgba(45, 40, 32, 0.04)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
