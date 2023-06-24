/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)',
				dimTertiary: 'var(--dimTertiary)',
				footer: 'var(--footer)',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
			borderOpacity: {
				10: '0.1',
				20: '0.2',
				50: '0.5',
			},
		},
		screens: {
			xs: '480px',
			ss: '620px',
			sm: '768px',
			md: '1060px',
			lg: '1200px',
			xl: '1700px',
		},
	},
	plugins: [],
};
