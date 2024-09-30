import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        "roboto-mono": ["var(--font-roboto-mono)", "monospace"],
        "merriweather": ["var(--font-merriweather)", "serif"],
      },
      screens: {
        tableBp: "1440px",
      },
    },
    colors: {
      white: "var(--white)",
      black: "var(--black)",

      gray: {
        100: "var(--gray-100)",
        200: "var(--gray-200)",
        600: "var(--gray-600)",
      },

      blue: {
        100: "var(--blue-100)",
        500: "var(--blue-500)",
        800: "var(--blue-800)",
        850: "var(--blue-850)",
      },

      green: {
        100: "var(--green-100)",
        500: "var(--green-500)",
        550: "var(--green-550)",
      },

      red: {
        100: "var(--red-100)",
        500: "var(--red-500)",
      },

      yellow: {
        100: "var(--yellow-100)",
      },

      cyan: {
        100: "var(--cyan-100)",
      },

      // Semantic names (for background, text, etc.)
      background: "var(--background)",
      "text-primary": "var(--text-primary)",
      "text-secondary": "var(--text-secondary)",
      "text-muted": "var(--text-muted)",
      "border-primary": "var(--border-primary)",
    },
  },
  plugins: [],
};
export default config;
