import { useEffect, useState } from 'react';
import styles from './style';
import { Navbar, Hero } from './components';

const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const htmlElement = document.documentElement;
		if (darkMode) {
			htmlElement.setAttribute('data-theme', 'dark');
		} else {
			htmlElement.removeAttribute('data-theme');
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<div className='bg-primary w-full overflow-hidden'>
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className='w-full'>
					<Navbar toggleDarkMode={() => toggleDarkMode()} />
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
