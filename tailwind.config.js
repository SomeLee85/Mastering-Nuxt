/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
module.exports = {
  content: ['node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}', 'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('flowbite/plugin')],
};
