/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body' : "#0d1218",
        'text' : "#59687D",
        'firstColor' : "#1B2330",
        'secondColor' : "#1E2A3A",
        'thirdColor' : "#D9D9D9", 
      },
    },
    container : {
      center: true,
      padding: '1rem',
      screens: {
        'sm' : "512px",
        'md' : "720px",
        'lg' : "1024px",
        'xl' : "1140px",
        '2xl' : "1320px"
      }
    },
  },
  plugins: [],
}

