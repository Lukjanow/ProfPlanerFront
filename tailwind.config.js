import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "5px",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#F6F6F6",
            foreground: "#444444",
            primary: {
              DEFAULT: "#4162D5",
              foreground: "#FFFFFF",
            },
            activeButton: "#D3D3D3"
          },
        },
        dark: {
          colors: {
            background: "#2A2A2A",
            foreground: "#EAEAEA",
            primary: {
              DEFAULT: "#4162D5",
              foreground: "#FFFFFF",
            },
            activeButton: "#3F3F3F",
            content1: "#373737",
            default: {
              100: "#454545",
              200: "#505050",
              50: "#FF0000"
            }
          },
        },
      },
    }),
  ],
};
