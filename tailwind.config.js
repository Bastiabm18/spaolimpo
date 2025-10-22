/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-jai': '#26336a', // Tu color personalizado no es el mismo azul pero no brilla tanto
        'blue-vet': '#3498DB', // Tu color 
        'blue-vet-light': '#AED6F1', // Tu color 
        'green-vet': '#82E0AA', // Tu color
        'green-vet-light': '#D5F5E3', // Tu color


        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    fontFamily: {
        // Se añade "sans-serif" como fuente de respaldo
        frijole: ["var(--font-frijole)", "sans-serif"],

        // Se añade "cursive" como respaldo, que es más apropiado para una fuente manuscrita
        caveat: ["var(--font-caveat)", "cursive"],

        // Se añade "sans-serif" como fuente de respaldo
        rubikDirt: ["var(--font-rubik-dirt)", "sans-serif"],
        alumniSans: ["var(--font-alumni-sans)", "sans-serif"],
      },
    },
  },
 
}