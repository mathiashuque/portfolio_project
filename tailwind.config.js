export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-elev": "rgb(var(--bg-elev) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",

        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",

        border: "rgb(var(--border) / <alpha-value>)",

        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2) / <alpha-value>)",
      },
      keyframes: {
        "marquee-px": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": {
            transform: "translate3d(calc(-1 * var(--marquee-shift)),0,0)",
          },
        },
      },
      animation: {
        "marquee-px": "marquee-px var(--marquee-duration, 10s) linear infinite",
        "marquee-px-reverse":
          "marquee-px var(--marquee-duration, 10s) linear infinite reverse",
      },
    },
  },
  plugins: [],
};
