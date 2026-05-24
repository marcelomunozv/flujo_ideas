/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        seed: '#fbbf24',
        active: '#3b82f6',
        mature: '#22c55e',
        archived: '#6b7280',
      },
    },
  },
  plugins: [],
}
