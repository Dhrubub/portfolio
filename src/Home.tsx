import { useEffect, useState } from 'react';
import styles from './style';
import {
	Navbar,
	Hero,
	Experience,
	Footer,
	Projects,
	Skills,
} from './components';
import { Helmet } from 'react-helmet';
import darkLogo from './assets/dark-logo.png';
import lightLogo from './assets/light-logo.png';
import darkLogoSquare from './assets/dark-logo-square.png';
import lightLogoSquare from './assets/light-logo-square.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from './components/ScrollToTop';
import WIPBanner from './components/WIPBanner';
import Experiment from './components/Experiment';

const Home = () => {
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
		<div className='bg-primary w-full overflow-hidden scrollbar'>
			<Helmet>
				<link
					rel='icon'
					type='image/svg+xml'
					href={darkMode ? darkLogo : lightLogo}
				/>
				<link
					rel='apple-touch-icon'
					href={darkMode ? darkLogoSquare : lightLogoSquare}
				/>
				<meta
					property='og:image'
					content={darkMode ? darkLogo : lightLogo}
				/>
			</Helmet>

			{/* <WIPBanner /> */}
			<ScrollToTop />

			<div
				className={`${styles.flexCenter} relative shadow sm:shadow-none`}
			>
				<div className={`${styles.boxWidth} sm:px-16 xl:pl-0 px-6`}>
					<Navbar
						isDarkMode={darkMode}
						toggleDarkMode={() => toggleDarkMode()}
					/>
				</div>
			</div>

			<div className='sm:hidden w-full xs:pt-6 border-t-[1px] border-t-secondary opacity-50'></div>

			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
					<Experience />
					<Projects />
					<Skills darkMode={darkMode} />
				</div>
			</div>

			<div className={`bg-footer ${styles.flexStart}`}>
				<div className={`w-full`}>
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default Home;
