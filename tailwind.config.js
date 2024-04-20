/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          '1': 'hsl(var(--primary-1) / <alpha-value>)',
          '2': 'hsl(var(--primary-2) / <alpha-value>)',
          '3': 'hsl(var(--primary-3) / <alpha-value>)',
        },
        secondary: {
          '1': 'hsl(var(--secondary-1) / <alpha-value>)',
          '2': 'hsl(var(--secondary-2) / <alpha-value>)',
          '3': 'hsl(var(--secondary-3) / <alpha-value>)',
          '4': 'hsl(var(--secondary-4) / <alpha-value>)',
        },
      },
    },
  },

  plugins: [],
}

