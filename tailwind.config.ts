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
        "cta-gradiant": "linear-gradient(145deg, #2f4d35, #4d6b75)",
      },
    },
  },
  plugins: [],
};
export default config;
