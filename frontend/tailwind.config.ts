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
        neutral: "var(--background-color)",
        primaryForm: "var(--primary-form-color)",
        secondaryForm: "var(--secondary-form-color)",
      },
      colors: {
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
    },
  },
  plugins: [],
};
export default config;
