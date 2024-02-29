/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5",
      },
      fontFamily: {
        heading: ["Montserrat", "serif"],
        primary: ["Roboto", "sans-serif"],
        accent: ["Fira Sans", "sans-serif"],
        bubble: ["Bubblegum Sans", "cursive"],
      },
      backgroundImage: {
        background: "url('/src/assets/clean interior.jpg')",
        hero: "url('/src/assets/bg-hero.jpg')",
        "info-men": "url('/src/assets/men.jpg')",
        "info-women": "url('/src/assets/women.jpg')",
        newHero: "url('/src/assets/cropped.jpg')",
        grad: "linear-gradient(to right, #abbaab, #ffffff);",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit,minmax(300px,1fr))",
      },
    },
  },
  plugins: [],
};
