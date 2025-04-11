/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary100: "#CCF5FF",
        primary200: "#9AE6FF",
        primary300: "#68D1FF",
        primary400: "#42BBFF",
        primary500: "#0496FF",
        primary600: "#0274DB",
        primary700: "#0256B7",
        primary800: "#013D93",
        primary900: "#002B7A",
        danger100: "#FFE6D6",
        danger200: "#FFC7AD",
        danger300: "#FFA283",
        danger400: "#FF7E65",
        danger500: "#FF4332",
        danger600: "#DB2424",
        danger700: "#B71926",
        danger800: "#930F25",
        danger900: "#7A0925",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [nextui(),],
}
