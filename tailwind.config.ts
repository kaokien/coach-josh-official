import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // This checks every possible folder to ensure styles always load
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        boxing: {
          cream: '#F2E8DC',   // Vintage Paper Background
          blue: '#4A6FA5',    // Royal Blue Glove Color
          red: '#D1495B',     // Fight Night Red
          black: '#1A1A1A',   // Soft Ink Black
        }
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],       // Blocky Headline Font
        body: ['Courier Prime', 'monospace'],    // Typewriter Body Font
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
