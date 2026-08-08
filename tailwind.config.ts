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
        background: '#FEF5E7',
        surface: '#FFF7EB',
        primary: '#3A2317',
        'primary-strong': '#2C160F',
        'accent-gold': '#E8A33D',
        'accent-cocoa': '#B5651D',
        'accent-berry': '#C25B4A',
        'accent-sage': '#7A8C75',
        border: '#D9C8B1',
        'text-dark': '#3A2317',
        'text-muted': '#6E5844',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(58, 35, 23, 0.09)',
        card: '0 20px 50px rgba(58, 35, 23, 0.12)',
        elevated: '0 28px 80px rgba(58, 35, 23, 0.14)',
      },
      borderRadius: {
        lg: '1.25rem',
        xl: '1.75rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
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
