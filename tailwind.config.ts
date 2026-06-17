import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        background: "#07111F",
        foreground: "#ffffff",
        gold: {
          DEFAULT: "#B9C3CF",
          soft: "#E3E8EE",
          deep: "#1A2A3D"
        },
        muted: "#A8B0BA",
        card: "rgba(255,255,255,0.06)",
        border: "rgba(185,195,207,0.18)"
      },
      fontFamily: {
        sans: [
          '"SF Pro Text"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Inter",
          "sans-serif"
        ],
        serif: [
          '"SF Pro Display"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Inter",
          "sans-serif"
        ],
        display: [
          '"SF Pro Display"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Inter",
          "sans-serif"
        ],
        instrument: ["var(--font-instrument-serif)", '"Instrument Serif"', "serif"]
      },
      boxShadow: {
        gold: "0 22px 80px rgba(92, 119, 148, 0.22)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 80px rgba(0,0,0,0.42)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, rgba(185,195,207,0), rgba(185,195,207,0.9), rgba(185,195,207,0))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
