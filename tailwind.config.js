/* eslint-disable quotes */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    screens: {
      xs: '580px',
      sm: '640px',
      md: '1000px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    minWidth: {
      '1/2': '50%',
      '1/3': '33%',
      '1/4': '25%',
    },
    extend: {
      zIndex: {
        100: '100',
      },
      colors: {
        'oxford-blue': '#101935',
        charcoal: '#33485E',
        'paynes-grey': '#557786',
        moonstone: '#78A6AE',
        'tiffany-blue': '#9AD4D6',
        'light-cyan': '#C6E9EB',
        'azure-blue': '#F2FDFF',
      },
      backgroundImage: {
        diversity: "url('./shared/assets/img/diversity.png')",
        education: "url('./shared/assets/img/education.png')",
        landing: "url('./shared/assets/img/standard-bg.jpeg')",
        'brain-network': "url('./shared/assets/img/brain-art.png')",
      },
      fontFamily: {
        sans: ['Gill Sans', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        raleway: ['Raleway', ' sans-serif'],
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
      },
      boxShadow: {
        std: '0 -5px 40px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp')],
};
