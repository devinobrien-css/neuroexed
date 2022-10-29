/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'dark-hex': "url('./img/hex-bg.png')",
				'main-brain': "url('./img/brain.gif')",
			},
			fontFamily: {
				'sans': 'Gill Sans'
			}
		},
	},
	plugins: [],
}
