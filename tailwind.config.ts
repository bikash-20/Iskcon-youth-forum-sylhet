import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm, traditional Indian palette with a contemporary edge.
        saffron: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        maroon: {
          50: "#fdf2f2",
          100: "#fbe4e4",
          200: "#f7c5c5",
          300: "#f0a1a1",
          400: "#e07070",
          500: "#c94545",
          600: "#a83232",
          700: "#7a1d1d",
          800: "#5b1414",
          900: "#3d0d0d",
        },
        cream: {
          50: "#fdfaf3",
          100: "#f8f0e1",
          200: "#f1e3c4",
          300: "#e9d4a3",
        },
        ink: {
          900: "#1a1410",
          800: "#2a201a",
          700: "#3a2d24",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        deva: ["var(--font-deva)", "Tiro Devanagari Sanskrit", "serif"],
      },
      letterSpacing: { tightish: "-0.012em" },
      boxShadow: {
        soft: "0 1px 2px rgba(26,20,16,0.04), 0 8px 24px rgba(26,20,16,0.06)",
        ring: "0 0 0 1px rgba(122,29,29,0.12), 0 12px 32px rgba(26,20,16,0.08)",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(rgba(122,29,29,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
