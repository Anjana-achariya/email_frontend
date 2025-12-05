/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {
      colors: {
        /* LIGHT MODE */
        background: "var(--color-background)",
        card: "var(--color-card)",
        text: "var(--color-text)",

        /* PRIMARY THEME — Cyan → Blue → Deep Blue */
        primary: "var(--color-primary)",
        "primary-mid": "var(--color-primary-mid)",
        "primary-dark": "var(--color-primary-dark)",

        /* INDIGO FAMILY */
        indigo: "var(--color-indigo)",
        "indigo-light": "var(--color-indigo-light)",

        /* ACCENT */
        accent: "var(--color-accent)",

        /* DARK MODE COLORS */
        "dark-bg": "var(--color-background)",
        "dark-card": "var(--color-card)",
        "dark-text": "var(--color-text)",
        "dark-border": "var(--color-dark-border)",
        "dark-muted": "var(--color-dark-muted)"
      },

      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Quicksand", "sans-serif"],
      }
    }
  },

  plugins: []
};
