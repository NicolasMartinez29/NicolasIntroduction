import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06070A',
          900: '#0B0D12',
          800: '#11141B',
          700: '#1A1E27',
          600: '#262B37',
          500: '#3A4150',
          400: '#5A6275'
        },
        edge: {
          DEFAULT: '#22C55E',
          dim: 'rgba(34,197,94,0.18)'
        },
        warn: '#F59E0B',
        bad: '#EF4444',
        cool: '#38BDF8'
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
