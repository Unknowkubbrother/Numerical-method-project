/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "rgb(77, 181, 255)",
      secondary: "rgb(40, 139, 209)",
      background: "rgb(22, 35, 46)",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      sky: colors.sky,
    },
    extend: {},
  },
  plugins: [],
};
