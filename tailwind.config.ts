import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bitly: {
          // Source of truth: Bitly Figma "Foundations" library (Colors - product)
          // https://www.figma.com/design/rFZfN435hlBfZnIk8a9fM6/Foundations?node-id=823-62
          primary: "#2A5BD7", // Blue/40 — real brand action color (Button/Primary+Brand)
          "primary-dark": "#0C3EBB", // Blue/50 — hover/active
          "primary-tint": "#EDF2FF", // Blue/10
          ink: "#273144", // Gray/90
          slate: "#526281", // Gray/70
          "slate-light": "#71809F", // Gray/60
          line: "#DBE0EB", // Gray/30
          surface: "#F4F6FA", // Gray/10
          teal: "#00A2B4", // Teal/50
          "teal-tint": "#ECFDFF", // Teal/10
          orange: "#FF6116", // Orange/40 — reserved for the logo mark only, not UI actions
          navy: "#001F66", // Blue/70 — the sidebar's "Create new" button
          danger: "#DE3121", // Red/40 — notification badge
        },
      },
      fontFamily: {
        sans: [
          "Bitly Displaay Standard",
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
        card: "0 1px 2px rgba(21, 27, 38, 0.06), 0 1px 1px rgba(21, 27, 38, 0.04)",
        modal: "0px 8px 16px 0px rgba(21, 27, 38, 0.12)", // Figma effect style "400"
        toolbar: "0 8px 24px rgba(21, 27, 38, 0.18)",
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
