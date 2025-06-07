const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': [...defaultTheme.fontFamily.sans],
        'mono': ['Monaco', 'Andale Mono', ...defaultTheme.fontFamily.mono],
        'serif': ['Spectral', ...defaultTheme.fontFamily.serif]
      },
    },
  },
  plugins: [],
}