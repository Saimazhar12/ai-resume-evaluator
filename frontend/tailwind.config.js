/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#0F172A",
          700: "#1E293B",
          500: "#475569",
          300: "#94A3B8",
        },
        brand: {
          blue: "#2563EB",
          indigo: "#6366F1",
          violet: "#7C3AED",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.10)",
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 12px 32px -16px rgba(15, 23, 42, 0.12)",
        glow: "0 0 0 1px rgba(99, 102, 241, 0.08), 0 20px 60px -20px rgba(99, 102, 241, 0.35)",
      },
      borderRadius: {
        xl2: "18px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};
