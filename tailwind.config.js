/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        mainPurple: '#663399',
        darkPurple: '#362063',
      }
    },
  },
  plugins: [],
}
