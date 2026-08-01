/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14181F",
          soft: "#1D2330",
          border: "#2A3140",
        },
        paper: "#F7F7F5",
        card: "#FFFFFF",
        slate: {
          text: "#4B5265",
          muted: "#8890A0",
          line: "#E4E4E0",
        },
        signal: {
          amber: "#E8A33D",
          red: "#D64545",
          teal: "#2F8F7D",
          blue: "#3E6FE0",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(20,24,31,0.06), 0 8px 24px rgba(20,24,31,0.06)",
      },
    },
  },
  plugins: [],
};
