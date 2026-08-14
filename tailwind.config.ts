import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bitly: {
          orange: "#EE6123",
          "orange-dark": "#D14E15",
          "orange-tint": "#FFF1E9",
          ink: "#1A1B25",
          slate: "#4B4D5C",
          "slate-light": "#7A7C8A",
          line: "#E4E4EA",
          surface: "#F7F7F9",
          teal: "#0E7C86",
          "teal-tint": "#E6F5F6",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "12px",
        modal: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 27, 37, 0.06), 0 1px 1px rgba(26, 27, 37, 0.04)",
        modal: "0 24px 48px -12px rgba(26, 27, 37, 0.35), 0 4px 16px rgba(26, 27, 37, 0.12)",
        toolbar: "0 8px 24px rgba(26, 27, 37, 0.18)",
      },
      keyframes: {
        "chart-draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "70%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        "count-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
