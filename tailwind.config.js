/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B7A3D',
          dark: '#145C2E',
          600: '#178537',
          light: '#E8F5EC',
          50: '#F0FDF4',
        },
        dark: {
          bg: '#0A0F0C',
          card: '#131A15',
          'card-hover': '#1A241C',
          border: '#1E2E22',
          text: '#C8DDD0',
        },
        gray: {
          50: '#F8FAF9',
          100: '#F1F4F2',
          200: '#E2E8E5',
          300: '#C5CFC9',
          400: '#8A9B91',
          500: '#5F7268',
          600: '#465550',
          700: '#2E3B34',
          800: '#1A2420',
        },
        accent: {
          amber: '#D97706',
          'amber-light': '#FEF3C7',
          blue: '#2563EB',
          'blue-light': '#DBEAFE',
          teal: '#0D9488',
          'teal-light': '#CCFBF1',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        lg: '20px',
        xl: '28px',
        full: '100px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)',
        md: '0 4px 16px rgba(0,0,0,.06)',
        lg: '0 12px 32px rgba(0,0,0,.08)',
        xl: '0 20px 60px rgba(0,0,0,.1)',
        'mega': '0 24px 64px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
};
