/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.html",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

