/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0B0D',
          secondary: '#151519',
          panel: '#1A1D27',
          surface: '#20222E',
          paper: '#F5F0E8',
          cream: '#FFFBF0'
        },
        brand: {
          yellow: '#FFD400',   // Marvel electric yellow
          red: '#ED1D24',      // Marvel iconic comic red
          blue: '#1769FF',     // Electric blue
          crimson: '#8B1118',  // Deep cinematic crimson
          steel: '#777780',    // Comic steel gray
          purple: '#8B5CF6',   // Sci-fi / Dark Fantasy purple
          cyan: '#00C8FF',     // Manga kinetic cyan
          green: '#22C55E',    // Comic power green
          paper: '#F5F0E8',    // Off-white paper
          cream: '#FFFBF0',
          muted: '#8C8C96',
          ink: '#0B0B0D',
          border: '#2A2A32'
        }
      },
      fontFamily: {
        comic: ['Bangers', 'Impact', 'cursive', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        display: ['"Bebas Neue"', '"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'comic-dark': '4px 4px 0px 0px #000000',
        'comic-red': '4px 4px 0px 0px #E62429',
        'comic-yellow': '4px 4px 0px 0px #FFCC00',
        'comic-blue': '4px 4px 0px 0px #0066FF',
        'comic-lg': '6px 6px 0px 0px #000000',
        'comic-white': '4px 4px 0px 0px #FFFFFF',
        'brutal-yellow': '4px 4px 0px 0px #FFCC00',
        'brutal-purple': '4px 4px 0px 0px #8B5CF6',
        'brutal-red': '4px 4px 0px 0px #E62429',
        'brutal-green': '4px 4px 0px 0px #22C55E',
        'brutal-white': '4px 4px 0px 0px #FFFFFF',
        'brutal-dark': '4px 4px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-yellow-lg': '6px 6px 0px 0px #FFCC00'
      }
    },
  },
  plugins: [],
}
