/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import daisyui from "daisyui";
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
      zinc: colors.zinc,
    },
    extend: {},
  },
  daisyui: {
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables,
    themes: [
      {
        mytheme: {
          "primary": 'rgb(77, 181, 255)',
  
          "secondary": 'rgb(40, 139, 209)',
  
          "accent": '#0069a9',
  
          "neutral": '#3d4451',
  
          'base-100': '#262626',
  
          "info": '#00e2ff',
  
          "success": '#00cc99',
  
          "warning": '#f47000',
  
          "error": '#d2004e'
        }
      },
    ],
  },
  plugins: [
    daisyui,
  ],
};
