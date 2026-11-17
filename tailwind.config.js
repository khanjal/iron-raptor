const { fontFamily } = require('tailwindcss/defaultTheme');

// Colours are defined once as CSS variables (RGB channels) in src/styles.scss
// and referenced here so Tailwind opacity modifiers (bg-accent/10) keep working.
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: c('bg'), dark: c('bg-deep'), light: c('surface') },
        secondary: { DEFAULT: c('surface'), dark: c('bg-deep'), light: c('surface-2') },
        steel:     { DEFAULT: c('border'), light: c('border-light') },
        accent:    { DEFAULT: c('accent'), hover: c('accent-hover') },
        text: {
          primary:   c('text'),
          secondary: c('text-2'),
          muted:     c('text-muted'),
        },
      },
      fontFamily: {
        sans:    ['Inter', ...fontFamily.sans],
        display: ['Rajdhani', 'Inter', ...fontFamily.sans],
        mono:    ['Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.01em' }],
        'display-lg': ['3rem',   { lineHeight: '1.1',  letterSpacing: '0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgb(var(--accent) / 0.25)',
        'glow':    '0 0 20px rgb(var(--accent) / 0.35)',
        'card':    '0 4px 12px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'fade-in':  'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
