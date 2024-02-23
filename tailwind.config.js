import {nextui} from "@nextui-org/react";

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
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    background: "#F6F6F6",
                    foreground: "#444444",
                    primary: {
                        900: "#234567",
                        DEFAULT: "#123456",
                        foreground: "#654321"
                    }
                }
            },
            dark: {
                colors: {
                    background: "#1A1A1A",
                    foreground: "#DADADA",
                    primary: {
                        900: "#543210",
                        DEFAULT: "#654321",
                        foreground: "#123456"
                    }
                }
            }
        }
    })],
}
