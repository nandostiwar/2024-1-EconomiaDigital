/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Monserrat': ['Montserrat', 'sans-serif']
      }
    },
    
    colors: {
      BTN: "#D6B751",
      Error: "#EC2424",
      beige: "#E4E6C3",
      purple: "#845BAA",
      purpleActive: "#7845A7"
      
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "forest", "business", "coffee", "black"],
  },
};
