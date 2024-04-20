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
          1: 'hsl(0deg, 0%, 10%)',
          2: 'hsl(0deg, 0%, 15%)',
          3: 'hsl(0deg, 0%, 20%)',
        },
        secondary: {
          1: '#FFFF',
          2: '#F6F5F4',
          3: '#E7E6E5',
          4: '#D8D7D6',
        },
      },
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: 'rgba(255, 255, 255, .1)',
      }),
    },
  },

  plugins: [],
}

