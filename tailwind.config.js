/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
    './src/sections/**/*.{html,js,jsx}',
    './src/styles/**/*.{js,jsx}',
    './src/app/projects/*/**.{js,jsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'primary-black': '#1A232E',
        'secondary-white': '#c7c7c7',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
    },
  },
  plugins: [],
};
