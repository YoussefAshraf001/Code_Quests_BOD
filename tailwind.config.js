/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables dark mode via 'dark' class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(2px)" },
        },
      },
      animation: {
        bob: "bob 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
