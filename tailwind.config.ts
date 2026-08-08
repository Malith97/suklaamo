import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: '#FDF6EC',
        primary: '#3A2317',
        'accent-gold': '#E8A33D',
        'accent-cocoa': '#B5651D',
        'accent-berry': '#C25B4A',
        'accent-sage': '#8FA68E',
        'text-dark': '#2B1B12',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(58, 35, 23, 0.09)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
