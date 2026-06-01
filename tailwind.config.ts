import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        betera: {
          ink: "#0f1f14",
          forest: "#14532d",
          "forest-light": "#166534",
          leaf: "#22c55e",
          "leaf-dark": "#15803d",
          cream: "#f4faf5",
          mist: "#ecfdf5",
          sand: "#d1e7d4",
          lime: "#84cc16",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        betera: "0 4px 24px rgba(20, 83, 45, 0.1)",
        "betera-lg": "0 12px 40px rgba(15, 31, 20, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
