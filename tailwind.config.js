/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'link-teal': 'rgb(0, 124, 137)',
        'dark-mode-blue': 'rgb(17,24,39)',
      },
    },
  },
  plugins: [],
  mode: 'jit',
};
