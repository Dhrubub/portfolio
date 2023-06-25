import { useEffect, useState } from 'react';
import styles from './style';
import { Navbar, Hero, Experience, Footer } from './components';
import { Helmet } from 'react-helmet';
import darkLogo from './assets/dark-logo.png';
import lightLogo from './assets/light-logo.png';

const App = () => {
	const [darkMode, setDarkMode] = useState(
		window.matchMedia('(prefers-color-scheme: dark)').matches
	);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [isNavbarFixed, setIsNavbarFixed] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);

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

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;

			setIsNavbarFixed(prevScrollPos > currentScrollPos);
			setPrevScrollPos(currentScrollPos);
			setIsScrolling(true);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollPos]);

	useEffect(() => {
		console.log(isScrolling);
	}, [isScrolling]);

	useEffect(() => {
		let scrollTimeout = null;

		const handleScrollTimeout = () => {
			setIsScrolling(false);
		};

		if (isScrolling) {
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(handleScrollTimeout, 200); // Adjust the duration as needed
		} else {
			setIsNavbarFixed(false);
		}

		return () => {
			clearTimeout(scrollTimeout);
		};
	});

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
			</Helmet>

			<div className={`${styles.flexCenter} shadow sm:shadow-none`}>
				<div
					className={`w-full ${
						isNavbarFixed ? 'fixed top-0 translate-y-0' : ''
					} z-[15] duration-500 transition-transform ease-in-out`}
				>
					<Navbar
						isDarkMode={darkMode}
						toggleDarkMode={() => toggleDarkMode()}
					/>
					<div
						className={`flex ${
							isNavbarFixed ? '' : 'sm:hidden'
						} w-full justify-between items-center 
				md:flex-row flex-col xs:pt-6 border-t-[1px] border-t-secondary opacity-50`}
					></div>
				</div>
			</div>

			{isNavbarFixed && (
				<div className='w-screen'>
					<div className='py-6' style={{ height: '64px' }} />
					<div
						className='flex w-full justify-between items-center 
						md:flex-row flex-col xs:pt-6'
					></div>
				</div>
			)}

			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
				</div>
			</div>

			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Experience />
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

export default App;
