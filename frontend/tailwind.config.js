/** @type {import('tailwindcss').Config} */
// import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#99BC85',
        secondary:'#FAF9F6',
        accent:'#E1F0DA'
      }
    },
  },
  plugins: [
  ],
}