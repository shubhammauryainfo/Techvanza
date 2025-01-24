/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this based on your file paths
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4A373',  // Adding the custom color
      },
    },
  },
  plugins: [],
};
