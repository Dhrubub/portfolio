import React, { useEffect, useState } from 'react';
import styles from './style';
import { Navbar } from './components';

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
				<div className={`${styles.boxWidth}`}>
					<Navbar toggleDarkMode={() => toggleDarkMode()} />
				</div>
			</div>
		</div>
		// <div className='bg-primary h-screen flex justify-center items-center'>
		// 	<div className='max-w-md p-6 rounded-lg shadow-lg'>
		// 		<div className='bg-secondary text-white'>
		// 			<h2 className='text-2xl font-bold'>Card Title</h2>
		// 			<p className='text-tertiary'>
		// 				Some text content inside the card.
		// 			</p>
		// 		</div>
		// 	</div>
		// 	<button
		// 		className='fixed top-4 right-4 p-2 rounded-full bg-gray-200 text-gray-800'
		// 		onClick={toggleDarkMode}
		// 	>
		// 		{darkMode ? 'Light Mode' : 'Dark Mode'}
		// 	</button>
		// </div>
	);
};

export default App;
