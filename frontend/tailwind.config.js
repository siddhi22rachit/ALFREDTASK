/** @type {import('tailwindcss').Config} */
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'


export default defineConfig ( {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Adjust paths as needed
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss(),

  ],
});
