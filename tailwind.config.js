/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware tokens (flip between day / "four du soir")
        page: "rgb(var(--page) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        inksoft: "rgb(var(--inksoft) / <alpha-value>)",
        inkmuted: "rgb(var(--inkmuted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        cream: "#F7F1E8",
        ivory: "#FBF7F0",
        espresso: "#241910",
        cocoa: "#3A2A1C",
        caramel: "#B97B45",
        crust: "#C98A4B",
        gold: "#D8A65B",
        clay: "#A9603A",
        muted: "#8A7866",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      animation: {
        "fade-rise": "fade-rise 0.9s ease-out both",
        "fade-rise-delay": "fade-rise 0.9s ease-out 0.2s both",
        "fade-rise-delay-2": "fade-rise 0.9s ease-out 0.4s both",
        "fade-rise-delay-3": "fade-rise 0.9s ease-out 0.6s both",
        marquee: "marquee 38s linear infinite",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
