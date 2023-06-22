import { useEffect, useState } from 'react';
import styles from './style';
import { Navbar, Hero } from './components';
import { Helmet } from 'react-helmet';
import darkLogo from './assets/dark-logo.png';
import lightLogo from './assets/light-logo.png';

const App = () => {
	const [darkMode, setDarkMode] = useState(
		window.matchMedia('(prefers-color-scheme: dark)').matches
	);

	useEffect(() => {
		const htmlElement = document.documentElement;
		if (darkMode) {
			htmlElement.setAttribute('data-theme', 'dark');
		} else {
			htmlElement.removeAttribute('data-theme');
		}
	}, [darkMode]);

	useEffect(() => {
		const matchMediaDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);

		const handleChange = (event) => {
			setDarkMode(event.matches);
		};

		setDarkMode(matchMediaDark.matches);
		matchMediaDark.addEventListener('change', handleChange);

		return () => {
			matchMediaDark.removeEventListener('change', handleChange);
		};
	}, []);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<div className='bg-primary w-full overflow-hidden'>
			<Helmet>
				<link
					rel='icon'
					type='image/svg+xml'
					href={darkMode ? darkLogo : lightLogo}
				/>
			</Helmet>

			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className='w-full'>
					<Navbar
						isDarkMode={darkMode}
						toggleDarkMode={() => toggleDarkMode()}
					/>
				</div>
			</div>

			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
				</div>
			</div>
		</div>
	);
};

export default App;
