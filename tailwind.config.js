/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryPurple: "#5C3C80",
        secondaryMagenta: "#96397C",
      },
    },
  },
  plugins: [],
};