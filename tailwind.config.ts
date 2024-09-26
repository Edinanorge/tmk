import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: " #2f4d35",
        tertiary: "#4d6b75",
        secondary: "#f7f7f7",
        light: "#cdc5b6",
        dark: "#333333",
      },
      backgroundImage: {
        "nav-gradient": "linear-gradient(to bottom,#cdc5b6, #2F4D35,#2f4d35 , #2F4D35)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
