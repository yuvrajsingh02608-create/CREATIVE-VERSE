/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05050a", // Deep ink black
        ink2: "#0d0d18",       // Secondary surface
        acid: "#b8ff00",       // Primary accent
        violet: "#6d28ff",     // Electric violet
        violet2: "#9d5cff",    // Lighter violet
        rose: "#ff1a6e",       // Hot rose
        orange: "#ff3d00",     // Flame orange
        cyan: "#00e5ff",       // Sky cyan
        gold: "#ffc107",       // Star ratings
        foreground: "#f5f0e8",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        clash: ["'Clash Display'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      animation: {
        'gradient-border': 'gradient-border 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-1%, -1%)' },
          '50%': { transform: 'translate(1%, 1%)' },
          '75%': { transform: 'translate(-0.5%, 0.5%)' },
        },
        'gradient-border': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
