import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    maxWidth: {
      xl: '512px',
    },
    fontSize: {
      sm: '1vw',      // Tamanho pequeno
      base: '2vw',    // Tamanho base
      // xl: '3vw',      // Extra grande
      '2xl': '4vw',   // 2x Extra grande
      '3xl': '5vw',   // 3x Extra grande
      '4xl': '6vw',   // 4x Extra grande
      '5xl': '7vw',   // 5x Extra grande
      '6xl': '3.75rem',   // 6x Extra grande
      '7xl': '9vw',   // 7x Extra grande
      '8xl': '10vw', 
    },
    extend: {
      colors : {
        'landing' : "#0a0e31",
        'FontColor' : '#b9b2ff',
        'ColorSmalText' : '#818596',
        'ButtonColor' : '#8B7FFF',
        'FontColorAuth' : '#E9F6FF',
        'Warning' : '#C1EDD5',
        'FormMessage' : '#A6ADBA',
        'LinkColor' : '#1F276F'
      }
    },
  },
  plugins: [],
} satisfies Config;
