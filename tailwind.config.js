/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customYellow: '#fdb833',
        customBlue: '#344466',
        bluePastel: '#387b8e',
      }
    },
  },
  plugins: [ daisyui ],
}

