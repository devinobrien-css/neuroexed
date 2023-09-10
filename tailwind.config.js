/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    screens: {
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
      backgroundImage: {
        'main-brain': "url('./shared/assets/img/brain.gif')",
        'brain-gif': "url('./shared/assets/img/brain.gif')",
        diversity: "url('./shared/assets/img/diversity.png')",
        education: "url('./shared/assets/img/education.png')",
        landing: "url('./shared/assets/img/backgrounds/bg-3.jpeg')",
        'brain-network': "url('./shared/assets/img/brain-art.png')",
        'brain-1': "url('./shared/assets/img/backgrounds/bg-1.png')",
        'brain-3': "url('./shared/assets/img/backgrounds/bg-3.png')",
        'brain-5': "url('./shared/assets/img/backgrounds/bg-5.png')",
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
  plugins: [require('flowbite/plugin')],
};
