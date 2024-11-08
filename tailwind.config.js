/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Poppins', 'sans-serif']
        sans: ['Roboto', 'sans-serif']
      },
      gridTemplateColumns: {
        '80/20': '80% 18%'
      }
    },
  },
  plugins: [],
}