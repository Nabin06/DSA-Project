/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#08080c',
        panel: '#0e0e14',
        panel2: '#131319',
        line: '#22222c',
        line2: '#2a2a36',
        muted: '#6b6b78',
        dim: '#9494a0',
        stack: {
          DEFAULT: '#a78bfa',
          soft: '#a78bfa1a',
        },
        queue: {
          DEFAULT: '#34d399',
          soft: '#34d3991a',
        },
        linkedlist: {
          DEFAULT: '#2dd4bf',
          soft: '#2dd4bf1a',
        },
        recursion: {
          DEFAULT: '#60a5fa',
          soft: '#60a5fa1a',
        },
        sorting: {
          DEFAULT: '#f472b6',
          soft: '#f472b61a',
        },
        searching: {
          DEFAULT: '#facc15',
          soft: '#facc151a',
        },
        danger: '#f87171',
        amber: '#fbbf24',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xxs: ['0.6875rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}
