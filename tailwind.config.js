/** @type {import('tailwindcss').Config} */

// Brand colours taken from the G2 storefront signage and logo:
// the navy signboard, the royal blue of the logo, the green shop pillars,
// and the cool white of the shop interior.
const navy = {
  50: '#f2f6ff',
  100: '#e4ecfe',
  200: '#c5d7fd',
  300: '#93b5fa',
  400: '#5b8df6',
  500: '#2f6bf0',
  600: '#1e4fd0',
  700: '#16389a',
  800: '#0f2a72',
  900: '#0a1a4a',
  950: '#060f2e',
};

const leaf = {
  50: '#f0fcf4',
  100: '#ddf8e6',
  200: '#b5efc9',
  300: '#7fe3a1',
  400: '#3dd06f',
  500: '#16b550',
  600: '#0e9f45',
  700: '#0b7f38',
  800: '#0b6430',
  900: '#0a5229',
  950: '#032e15',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy,
        leaf,
        shop: '#f3f6fb',
        paper: {
          DEFAULT: '#f3f6fb',
          dark: '#e6ecf5',
        },
        // Older names, still used by the staff/admin pages.
        primary: navy,
        accent: leaf,
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        // One family, three voices: the width axis runs from condensed (62%)
        // to expanded (125%), which is what the "sign" headings use.
        sans: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
        display: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.7, 0, 0.2, 1)',
        settle: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
