import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primaryForm: "var(--primary-form-color)",
        secondaryForm: "var(--secondary-form-color)",
      },
      colors: {
        neutral: "var(--background-color)",
        primary: "var(--primary-color)",
        complementary: "var(--complementary-color)",
        accent: "var(--accent-color)",
        field: "var(--field-color)",
      },
      textColor: {
        dark: "var(--dark)",
        light: "var(--lighter)",
        success: "var(--success)",
        error: "var(--error)",
      },
      animation: {
        loading: "loading 2s infinite ease",
        loadingInner: "loadingInner 2s infinite ease",
      },
      keyframes: {
        loading: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%,50%": {
            transform: "rotate(180deg)",
          },
          "75%,100%": {
            transform: "rotate(360deg)",
          },
        },
        loadingInner: {
          "0%,25%": {
            height: "0%",
          },
          "50%,75%": {
            height: "100%",
          },
          "100%": {
            height: "0%",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
