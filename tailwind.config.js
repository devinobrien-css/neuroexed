/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		screens: {
			'sm': '640px',
			'md': '1000px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		minWidth: {
			'1/2': '50%',
			'1/3': '33%',
			'1/4': '25%',
		},
		extend: {
			backgroundImage: {
				'dark-hex':"url('./img/hex-bg-dark.png')",
				'light-hex':"url('./img/standard-bg-light.png')",
				'hex': "url('./img/hex-bg.png')",
				'main-brain': "url('./img/brain.gif')",
				'brain-gif': "url('./img/brain.gif')",
				'diversity': "url('./img/diversity.png')",
				'education':"url('./img/education.png')",
				'triune':"url('./img/triune.png')"
			},
			fontFamily: {
				'sans': 'Gill Sans'
			}
		},
	},
	plugins: [
        require('flowbite/plugin')
    ]
}
