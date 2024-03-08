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
              900: "#3A405A",
              DEFAULT: "#3A405A",
              foreground: "#FFFFFF",
            },
            secondary: {
              900: "#FFB641",
              DEFAULT: "#FFB641",
              foreground: "#FFB641",
            },
            activeButton: "#D3D3D3"
          },
        },
        dark: {
          colors: {
            background: "#1A1A1A",
            foreground: "#DADADA",
            primary: {
              900: "#543210",
              DEFAULT: "#654321",
              foreground: "#123456",
            },
            secondary: {
              900: "#FFB641",
              DEFAULT: "#FFB641",
              foreground: "#FFB641",
            },
            activeButton: "#3D3D3D"
          },
        },
      },
    }),
  ],
};
