/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
          "slide-top": "slide-top 2.0s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
      },
      keyframes: {
          "slide-top": {
              "0%": {
                  transform: "translateY(0px)"
              },
              to: {
                  transform: "translateY(-100px)"
              }
          }
      }
    }
  },
  plugins: [],
};
