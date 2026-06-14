/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				bg: 'var(--bg)',
				bgTint: 'var(--bg-tint)',
				surface: 'var(--surface)',
				surface2: 'var(--surface-2)',
				ink: 'var(--ink)',
				inkSoft: 'var(--ink-soft)',
				inkFaint: 'var(--ink-faint)',
				rose: 'var(--rose)',
				roseDeep: 'var(--rose-deep)',
				roseSoft: 'var(--rose-soft)',
				jade: 'var(--jade)',
				jadeSoft: 'var(--jade-soft)',
				line: 'var(--line)',
				lineStrong: 'var(--line-strong)',
				/* legacy aliases so nothing breaks mid-migration */
				primary: 'var(--bg)',
				secondary: 'var(--ink)',
				tertiary: 'var(--rose)',
			},
			fontFamily: {
				display: ['Space Grotesk', 'system-ui', 'sans-serif'],
				body: ['DM Sans', 'system-ui', 'sans-serif'],
				mono: ['Space Mono', 'ui-monospace', 'Menlo', 'monospace'],
			},
			borderColor: {
				DEFAULT: 'var(--line)',
			},
			boxShadow: {
				card: '0 1px 2px var(--shadow), 0 8px 24px -16px var(--shadow)',
				hard: '4px 4px 0 var(--ink)',
				hardRose: '4px 4px 0 var(--rose)',
			},
			screens: {
				xs: '480px',
				ss: '620px',
				sm: '768px',
				md: '1060px',
				lg: '1200px',
				xl: '1700px',
			},
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-up': 'fade-up 0.5s ease forwards',
			},
		},
	},
	plugins: [],
};
