/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",  
  ],  
  theme: {
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {},
  },
  plugins: [],
}

