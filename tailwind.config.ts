import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#B8933E", // Primary gold — pulled from the Somnath Cab logo mark
          dark: "#96742E",
          black: "#0B1D33", // Deep navy — used for headings, nav/footer backgrounds
          charcoal: "#16283F",
          light: "#F7F5F0", // Warm ivory, not a cold gray — pairs with the gold accent
        },
        success: "#2BA745",
        warning: "#FFB800",
        danger: "#DC3545",
        info: "#17A2B8",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#B8933E",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0B1D33",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F7F5F0",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#FBF3E3",
          foreground: "#111111",
        },
        destructive: {
          DEFAULT: "#DC3545",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111111",
        },
        input: "hsl(var(--input))",
        ring: "#FFC107",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.1", fontWeight: "600" }],
        h2: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["20px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.06)",
        "card-hover": "0 12px 30px rgba(0,0,0,0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
