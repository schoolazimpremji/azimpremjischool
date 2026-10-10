import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f3',
          100: '#e1ede4',
          200: '#c5ddcc',
          300: '#9dc3a8',
          400: '#6ea37d',
          500: '#4c855d',
          600: '#396947',
          700: '#2e5439',
          800: '#26432f',
          900: '#1e3425',
          950: '#0e1d13',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e9ece4',
          200: '#d5dbce',
          300: '#b8c3ae',
          400: '#99a88e',
          500: '#7c8e71',
          600: '#617157',
          700: '#4c5844',
          800: '#3e4838',
          900: '#343c30',
        },
        ochre: {
          50: '#fdfbf5',
          100: '#faf5e6',
          200: '#f4e8c5',
          300: '#ecda9b',
          400: '#e1c66c',
          500: '#d4b143',
          600: '#ba9433',
          700: '#946f29',
          800: '#795826',
          900: '#654823',
        },
        terracotta: {
          50: '#fdf5f2',
          100: '#fae8e2',
          200: '#f5d4c8',
          300: '#ebb6a3',
          400: '#de8d73',
          500: '#cf684b',
          600: '#b95136',
          700: '#9b402a',
          800: '#7f3625',
          900: '#693023',
        },
        parchment: {
          50: '#fdfdfb',
          100: '#faf7f0',
          200: '#f4ede0',
          300: '#ebdcc7',
          400: '#dec5a6',
          500: '#cfa984',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
