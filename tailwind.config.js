/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        nutresa: {
          DEFAULT: "#009444",
          dark: "#00532a",
        },
      },
    },
  },
  plugins: [],
};
